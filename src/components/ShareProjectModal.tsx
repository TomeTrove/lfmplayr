import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import logo from "@/assets/lfmplogo.svg";
import { IoMdCloseCircleOutline } from "react-icons/io";


export function ShareProjectModal(props: {
    close: ()=>void
}) {
    const q = useQuery({
        queryKey: ["status"],
        queryFn: ()=>fetch("/api/status").then(res => res.json())
    })
    const status = useMemo(()=>q.data as {VERSION:string} | undefined, [q.data])
    return (
        <div className="bg-[var(--bg-color)] w-[500px] h-[400px] flex flex-col items-center p-[25px]">
            <button onClick={props.close} style={{ position: "absolute", top: 10, right: 10 }} className="flex flex-row gap-1">
                Close
                <IoMdCloseCircleOutline size={24} color="white"/>
            </button>
            <img src={logo} alt="Local File Media Player" className="w-[200px]" />
            <h3>Version: {status?.VERSION}</h3>
            <a href="https://github.com/TomeTrove/lfmplayr" target="_blank">https://github.com/TomeTrove/lfmplayr</a>
            <a href="https://github.com/TomeTrove/lfmplayr/releases/latest" target="_blank">Download Latest</a>
        </div>
    )
}