// This is the layout file of the app
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_appLayout')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex flex-col min-h-screen">
			<div>
				<h1>App Layout</h1>
			</div>
			<Outlet />
		</div>
	)
}
