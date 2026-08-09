import type { PropsWithChildren } from "react";
import { QueryContextProvider } from "./QueryContextProvider";

export function BaseContextProvider(props:PropsWithChildren) {
    return (
        <QueryContextProvider>
            {props.children}
        </QueryContextProvider>
    )
}