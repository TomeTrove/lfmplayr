import { RootHeader } from '@/components/RootHeader'
import { Link, Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/')({
    component: Index,
})

function Index() {
    return (
        <div className="app">
            Dashboard Home
        </div>
    )
}