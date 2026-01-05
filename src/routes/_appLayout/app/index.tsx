import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appLayout/app/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_appLayout/"!</div>
}
