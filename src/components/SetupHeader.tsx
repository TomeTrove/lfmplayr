import { useRouter } from "@tanstack/react-router"
import { useCallback, useEffect, useMemo } from "react"
import { LuArrowBigLeftDash } from "react-icons/lu";

const PageOrder = [
    "/",
    "profile",
    "libraries"
] as const
const Button = `
px-[4px] 
py-[2px] 
bg-[rgba(255,255,255,0.3)] 
mx-[8px]
rounded-sm
flex flex-row items-center align-middle
`.replace("\n", " ")
export function SetupHeader(props: {
    current: typeof PageOrder[number]
}) {
    const isFirst = useMemo(()=>PageOrder.indexOf(props.current) === 0, [props.current])
    const isLast = useMemo(() => PageOrder.indexOf(props.current) === PageOrder.length-1, [props.current])
    const nextPage = useMemo(() => {
        const i = PageOrder.indexOf(props.current);
        if (i + 1 > PageOrder.length) return undefined;
        return `/setup/${PageOrder[i+1]}`
    }, [props.current])
    const prevPage = useMemo(() => {
        const i = PageOrder.indexOf(props.current);
        if (i - 1 < 0) return undefined;
        return `/setup/${PageOrder[i-1]}`
    }, [props.current])
    
    const router = useRouter()
    useEffect(() => {
        fetch("/api/setup", {
            method: "POST",
            body: JSON.stringify({
                page: props.current
            })
        })
    }, [props.current])

    const next = useCallback(async () => {
        if (isLast) {
            await fetch("/api/setup", {
                method: "POST",
                body: JSON.stringify({
                    isFinished: true
                })
            })
            router.navigate({ to: "/" })
            return;
        }
        router.navigate({to:nextPage})
        
    }, [])
    const prev = useCallback(() => {
        router.navigate({to:prevPage})
    }, [])
    return (
       <div className="brdbx p-[8px] pb-[0px] fixed top-[0px] left-[0px] right-[0px]" style={{backdropFilter:"blur(5px)"}}>
            <div className="h-[48px] w-full bg-black rounded-sm flex flex-row items-center justify-between">
                <button disabled={isFirst} onClick={prev} className={Button+" pr-[8px]"} style={{opacity: isFirst ? 0.5 : 1}}>
                    <LuArrowBigLeftDash size={24} color={"white"} />
                    <span>Prev</span>
                </button>
                <button onClick={next} className={Button+" pl-[8px]"}>
                    <span>{isLast ? "Complete" : "Next"}</span>
                    {!isLast &&
                    <LuArrowBigLeftDash size={24} color={"white"} style={{transform:"scaleX(-1)"}} />
                    }
                </button>
            </div>
        </div>
    )
}