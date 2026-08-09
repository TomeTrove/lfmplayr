import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/setup')({
    component: Comp,
})

function Comp() {
    return (
        <>
            <Outlet />
        </>
    )
}