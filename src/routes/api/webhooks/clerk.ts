import { createFileRoute } from '@tanstack/react-router'
import { Webhook } from 'svix'
import { prisma } from '@/db'

export const Route = createFileRoute('/api/webhooks/clerk')({
  loader: () => null,

  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

        if (!WEBHOOK_SECRET) {
          console.error('Missing CLERK_WEBHOOK_SECRET')
          return new Response('Server configuration error', { status: 500 })
        }

        // Get the headers
        const svix_id = request.headers.get('svix-id')
        const svix_timestamp = request.headers.get('svix-timestamp')
        const svix_signature = request.headers.get('svix-signature')

        // If there are no headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
          return new Response('Error occured -- no svix headers', {
            status: 400,
          })
        }

        // Get the body
        const payload = await request.text()

        // Create a new Svix instance with your secret.
        const wh = new Webhook(WEBHOOK_SECRET)

        let evt: any

        // Verify the payload with the headers
        try {
          evt = wh.verify(payload, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
          })
        } catch (err) {
          console.error('Error verifying webhook:', err)
          return new Response('Error occured', {
            status: 400,
          })
        }

        const eventType = evt.type

        if (eventType === 'user.created') {
          const { id, email_addresses, username, first_name, last_name } = evt.data
          const email = email_addresses[0]?.email_address

          if (!email) {
            return new Response('Error: No email found', { status: 400 })
          }

          try {
            await prisma.user.create({
              data: {
                clerkId: id,
                email,
                username: username || email.split('@')[0] || `user_${id.substring(0, 8)}`, // Robust fallback
                firstName: first_name,
                lastName: last_name,
                status: 'ACTIVE',
              },
            })
            console.log(`User created: ${id}`)
          } catch (e) {
            console.error('Error creating user in DB:', e)
            return new Response('Error creating user', { status: 500 })
          }
        }

        return new Response('Webhook received', { status: 200 })
      },
    },
  },
})
