import { SetupHeader } from '@/components/SetupHeader'
import { createFileRoute, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/setup/libraries')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <div>
            <SetupHeader current='libraries' />
        </div>
    )
}
