import { RootHeader } from '@/components/RootHeader'
import { Link, Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/general')({
    component: Index,
})

function Index() {
    return (
        <div className="app">
            General Settings
        </div>
    )
}