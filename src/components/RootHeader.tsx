import { RxHamburgerMenu } from "react-icons/rx";
import logo from "@/assets/lfmplogo.svg";
import { IoIosSearch } from "react-icons/io";
import { useCallback, useState } from "react";
import { IoOptions } from "react-icons/io5";
import { Link, useRouter } from "@tanstack/react-router";
import { AiFillHome } from "react-icons/ai";
import { LuWrench } from "react-icons/lu";
import { IoShareSocial } from "react-icons/io5";
import { RxCaretDown } from "react-icons/rx";
import { LuActivity } from "react-icons/lu";
import { ShareProjectModal } from "./ShareProjectModal";
export function RootHeader(props: {
    leftButton?: "menu" | "home"
}) {
    const [hasFocus, setFocus] = useState(false)
    const [accountActive, setAccountActive] = useState(false)
    const router = useRouter()
    const toggleAccount = useCallback((close?:boolean) => {
        setAccountActive(!accountActive)
        if (accountActive || close == true) {
            (document.getElementById("account-menu") as HTMLDialogElement).close()
        } else {
            (document.getElementById("account-menu") as HTMLDialogElement).showModal()
        }
    }, [accountActive])
    return (
        <div className="brdbx p-[8px]">
            <div className="h-[48px] w-full bg-black rounded-sm flex flex-row items-center">
                <div className="px-[16px]" style={{ cursor: "pointer" }} onClick={() => {
                    if (props.leftButton === "home") {
                        router.navigate({ to: "/" });
                        return;
                    }
                    console.log("menu")
                }}>
                    {props.leftButton !== "home" && 
                        <RxHamburgerMenu size={24} color="white"/>
                    }
                    {props.leftButton === "home" && 
                        <AiFillHome size={24} color="white"/>
                    }
                </div>
                <Link to={`/`} className="px-[16px]">
                    <img src={logo} alt="Bun Logo" className="h-[35px]" />
                </Link>
                <div className="px-[16px]">
                    <div
                        className={
                            `h-[32px] w-[448px] rounded-full flex flex-row items-center ${hasFocus
                                ? "bg-white"
                                : "bg-[rgba(255,255,255,0.13)]"
                            }`}
                    >
                        <div className="px-[8px]">
                            <IoIosSearch size={16} color={hasFocus ? "black" : "white"} />
                        </div>
                        <input
                            onFocus={() => setFocus(true)}
                            onBlur={()=> setFocus(false)}
                            className="flex-1"
                            autoCapitalize="words"
                            style={{ color:hasFocus ? "black" : "white", backgroundColor: "transparent", "outline": "none" }}
                        />
                        <button className={hasFocus
                            ? "w-[24px] h-[24px] px-[4px] mr-[4px]"
                            : "w-[0px] h-[0px]"
                        }
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                        >
                            <IoOptions size={hasFocus ? 16 : 0} color={hasFocus ? "black" : "transparent"}/>
                        </button>
                    </div>
                </div>
                <div className="flex-1 flex flex-row justify-end gap-[15px]">
                    <button  className="flex justify-center items-center" onClick={()=>(document.getElementById("share-project") as HTMLDialogElement).showModal()}>
                        <IoShareSocial size={24} color="white"/>
                    </button>
                    
                    <Link to="/dashboard" className="px-[8px] flex justify-center items-center">
                        <LuActivity size={24} color="white" />
                    </Link> 
                    
                    <Link to="/dashboard/general" className="px-[8px] flex justify-center items-center">
                        <LuWrench size={24} color="white" style={{transform:"scaleX(-1)"}} />
                    </Link>  

                    <button className="flex flex-row pr-[16px]" style={{ position: "relative", "anchorName": "--account-anchor" }} onClick={()=>toggleAccount()}>
                        <img style={{width:30, height:30, borderRadius:30, backgroundColor:"red"}}></img>
                        <RxCaretDown size={24} color="white" style={{transform:accountActive ? "scaleY(-1)" : ""}} />
                    </button>
                </div>
            </div>
            <dialog id="share-project" className="bg-blur" popover={"auto"} style={{background:"transparent"}} onClick={(e)=>(e.target as HTMLDialogElement).close()}>
                <div className="flex w-full h-full justify-center items-center" style={{backdropFilter:"blur(5px)", color:"white"}} onClick={(e)=>e.stopPropagation()}>
                    <ShareProjectModal close={()=>(document.getElementById("share-project") as HTMLDialogElement).close()} />
                </div>
            </dialog>
            <dialog id="account-menu" popover="auto" style={{
                background: "transparent", cursor: "default",
                "position": "fixed",
                "positionAnchor": "--account-anchor",
                "positionArea": "bottom span-all",
                "padding": 0,
                "paddingRight": 24,
                "paddingTop": 4,
            }} onClick={(e)=>toggleAccount(true)}>
                <div
                    style={{ width: 248, height: 50, backgroundColor: "green", overflow: "hidden" }}
                    onClick={(e) => e.stopPropagation()}
                    className="rounded-sm"
                >

                </div>
            </dialog>
        </div>
    )
}