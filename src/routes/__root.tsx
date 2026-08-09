
import { RootHeader } from '@/components/RootHeader'
import { BaseContextProvider } from '@/contexts'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const RootLayout = () => (
    <BaseContextProvider>
        <Outlet />
        <TanStackRouterDevtools />
    </BaseContextProvider>
)

export const Route = createRootRoute({ component: RootLayout })