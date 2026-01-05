import { createFileRoute, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex flex-col items-center justify-center h-64 gap-6">
			<h1 className="text-4xl font-bold tracking-tight">Home Page Combined</h1>
			<div className="flex gap-4">
				<Button variant="outline" asChild>
					<Link to="/app">App</Link>
				</Button>
				<Button variant="outline" asChild>
					<Link to="/demo">Demo</Link>
				</Button>
			</div>
		</div>
	)
}
