import { RootHeader } from '@/components/RootHeader'
import type { FileRoutesByTo } from '@/routeTree.gen'
import { Link, Outlet } from '@tanstack/react-router'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
    component: Index,
})
type SectionT = {
    name: string,
    links: {name:string, url:keyof FileRoutesByTo}[]
}[]

const Sections:SectionT = [
    {
        name: "Status",
        links: [
            { name: "Dashboard", url: "/dashboard" }
        ]
    },
    {
        name: "Settings",
        links: [
            { name: "General", url: "/dashboard/general" }
        ]
    },
    {
        name: "Manage",
        links: [
            { name: "Libraries", url: "/dashboard/manage/libraries" },
            { name: "Profiles", url: "/dashboard/manage/profiles" }
        ]
    }
] satisfies SectionT;

function Index() {
    return (
        <>
            <RootHeader leftButton='home' />
            <div className='flex flex-row flex-1'>
                <div className="flex flex-col gap-2 w-[260px] ml-[8px] px-[8px]" style={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
                    {Sections.map(section => (
                        <>
                            <h4 className='text-lg' style={{color:"#848484"}}>{section.name}</h4>
                            {section.links.map(link => (
                                <Link to={link.url} activeOptions={{ exact: true }} className='[&.active]:font-bold'>
                                    <span className="[&.active]:font-bold text-md pl-[20px]">
                                        {link.name}
                                    </span>
                                </Link>
                            ))}
                        </>
                    ))}
                </div>
                <div className='flex-1'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}