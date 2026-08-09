import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

const router = createRouter({
  routeTree,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const elem = document.getElementById("root")!;
if (!window.location.pathname.startsWith("/setup/") && window.location.pathname !== "/setup") {
  fetch("/api/setup").then(async res => {
    let val = await res.json()
    console.log("val", val)
    if (val.isFinished !== true) router.navigate({to:val.page != undefined ? `/setup/${val.page}` : "/setup"})
  })
}

createRoot(elem).render(
    <RouterProvider router={router} />
);