import { RootHeader } from "@/components/RootHeader"
import { createFileRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export const Route = createFileRoute('/_media')({
    component: Index,
})

const Libraries = [
    {
        name: "Movies",
    },
    {
        name:"TV Shows"
    },
    {
        name:"Animated Shows"
    },
    {
        name:"Books"
    },
    {
        name:"Audiobooks"
    }
]
const TabLinkClassName = "[&.active]:font-bold w-full max-w-full min-w-[64px] flex flex-row h-[40px] items-center"

function Index() {
    return (
        <>
            <RootHeader />
            <div className='flex flex-row flex-1'>
                <div className="flex flex-col gap-2 w-[260px] ml-[8px]" style={{backgroundColor:"rgba(0,0,0,0.2)"}}>
                    <Link to="/" className={TabLinkClassName}>
                        <span style={{marginLeft:16, marginRight:16, width:24, maxWidth:24, minWidth:24}}></span>
                        <span className="[&.active]:font-bold">
                            Home
                        </span>
                    </Link>
                    <Link to="/about" className={TabLinkClassName}>
                        <span style={{marginLeft:16, marginRight:16, width:24, maxWidth:24, minWidth:24}}></span>
                        <span className="[&.active]:font-bold">
                            Files
                        </span>
                    </Link>
                    {Libraries.map(library => (
                        <Link
                            to="/libraries/$libId"
                            params={{ libId: encodeURIComponent(library.name) }}
                            className={TabLinkClassName}
                        >
                            <span style={{marginLeft:16, marginRight:16, width:24, maxWidth:24, minWidth:24}}></span>
                            <span className="[&.active]:font-bold">
                                {library.name}
                            </span>
                        </Link>
                    ))}
                </div>
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}