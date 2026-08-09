import { createFileRoute } from '@tanstack/react-router'

import { APITester } from "@/components/APITester";
import logo from "@/assets/logo.svg";
import reactLogo from "@/assets/react.svg";

export const Route = createFileRoute('/_media/')({
    component: Index,
})

function Index() {
    return (
        <div className="app">
            
        </div>
    )
}