import { SetupHeader } from '@/components/SetupHeader'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useCallback, useEffect } from 'react'
import logo from "@/assets/lfmplogo.svg";

export const Route = createFileRoute('/setup/')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <SetupHeader current="/" />
            <div className='flex w-full justify-center'>
                <div className='flex flex-col items-center w-full max-w-[900px] gap-2'>
                    <div style={{height:100}}></div>
                    <img src={logo} alt="Local File Media Player" className="w-[200px]" />
                    <p>
                        Local File Media Player is a react interface for consuming local media files.
                        LFMP allows you to select local folders as "libraries" to scan for media.
                        It then uses public sources to match your local files with rich metadata.
                    </p>
                    <div style={{height:50}}></div>
                    <h3 className='text-xl'>First Time Setup Process</h3>
                    <p>Please complete the following setup process to costomize your experience.</p>
                    <div style={{height:500}}></div>

                </div>
            </div>

        </>
    )
}
