import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_media/libraries/$libId')({
    component: RouteComponent,
})

function RouteComponent() {
    const { libId } = Route.useParams()
    const LibraryName = decodeURIComponent(libId);
    return <div>Library {LibraryName}</div>
}
