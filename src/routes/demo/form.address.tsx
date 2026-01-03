import { revalidateLogic } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { useAppForm } from '@/hooks/demo.form'

const addressFormSchema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
	email: z.email('Invalid email address'),
	address: z.object({
		street: z.string().min(1, 'Street address is required'),
		city: z.string().min(1, 'City is required'),
		state: z.string().min(1, 'State is required'),
		zipCode: z
			.string()
			.min(1, 'Zip code is required')
			.regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code format'),
		country: z.string().min(1, 'Country is required'),
	}),
	phone: z
		.string()
		.min(1, 'Phone number is required')
		.regex(
			/^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
			'Invalid phone number format',
		),
})

function zodValidate<T>(schema: z.ZodType<T>) {
	return ({ value }: { value: T }) => {
		const result = schema.safeParse(value)
		return result.success ? undefined : result.error.issues[0].message
	}
}

export const Route = createFileRoute('/demo/form/address')({
	component: AddressForm,
})

function AddressForm() {
	const form = useAppForm({
		defaultValues: {
			fullName: '',
			email: '',
			address: {
				street: '',
				city: '',
				state: '',
				zipCode: '',
				country: '',
			},
			phone: '',
		},
		validationLogic: revalidateLogic({
			mode: 'blur',
			modeAfterSubmission: 'change',
		}),
		onSubmit: ({ value }) => {
			console.log(value)
			// Show success message
			alert('Form submitted successfully!')
		},
	})

	return (
		<div
			className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-white"
			style={{
				backgroundImage:
					'radial-gradient(50% 50% at 5% 40%, #f4a460 0%, #8b4513 70%, #1a0f0a 100%)',
			}}
		>
			<div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
				<form
					onSubmit={(e) => {
						e.preventDefault()
						e.stopPropagation()
						form.handleSubmit()
					}}
					className="space-y-6"
				>
					<form.AppField
						name="fullName"
						validators={{
							onDynamic: zodValidate(addressFormSchema.shape.fullName),
						}}
					>
						{(field) => <field.TextField label="Full Name" />}
					</form.AppField>

					<form.AppField
						name="email"
						validators={{
							onDynamic: zodValidate(addressFormSchema.shape.email),
						}}
					>
						{(field) => <field.TextField label="Email" />}
					</form.AppField>

					<form.AppField
						name="address.street"
						validators={{
							onDynamic: zodValidate(
								addressFormSchema.shape.address.shape.street,
							),
						}}
					>
						{(field) => <field.TextField label="Street Address" />}
					</form.AppField>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<form.AppField
							name="address.city"
							validators={{
								onDynamic: zodValidate(
									addressFormSchema.shape.address.shape.city,
								),
							}}
						>
							{(field) => <field.TextField label="City" />}
						</form.AppField>
						<form.AppField
							name="address.state"
							validators={{
								onDynamic: zodValidate(
									addressFormSchema.shape.address.shape.state,
								),
							}}
						>
							{(field) => <field.TextField label="State" />}
						</form.AppField>
						<form.AppField
							name="address.zipCode"
							validators={{
								onDynamic: zodValidate(
									addressFormSchema.shape.address.shape.zipCode,
								),
							}}
						>
							{(field) => <field.TextField label="Zip Code" />}
						</form.AppField>
					</div>

					<form.AppField
						name="address.country"
						validators={{
							onDynamic: zodValidate(
								addressFormSchema.shape.address.shape.country,
							),
						}}
					>
						{(field) => (
							<field.Select
								label="Country"
								values={[
									{ label: 'United States', value: 'US' },
									{ label: 'Canada', value: 'CA' },
									{ label: 'United Kingdom', value: 'UK' },
									{ label: 'Australia', value: 'AU' },
									{ label: 'Germany', value: 'DE' },
									{ label: 'France', value: 'FR' },
									{ label: 'Japan', value: 'JP' },
								]}
								placeholder="Select a country"
							/>
						)}
					</form.AppField>

					<form.AppField
						name="phone"
						validators={{
							onDynamic: zodValidate(addressFormSchema.shape.phone),
						}}
					>
						{(field) => (
							<field.TextField label="Phone" placeholder="123-456-7890" />
						)}
					</form.AppField>

					<div className="flex justify-end">
						<form.AppForm>
							<form.SubscribeButton label="Submit" />
						</form.AppForm>
					</div>
				</form>
			</div>
		</div>
	)
}
