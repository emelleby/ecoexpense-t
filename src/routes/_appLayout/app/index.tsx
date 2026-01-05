import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appLayout/app/')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div className="text-3xl">Hello App!</div>
}
