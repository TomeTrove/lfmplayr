import { serve, spawn } from "bun";
import index from "@/App/index.html";

import endpoint_status from "@/api/status"
import endpoint_setup from "@/api/setup"
import endpoint_library_index from "@/api/libaries/index"

export function StartServer() {
    return serve({
        routes: {
            // Serve index.html for all unmatched routes.
            "/*": index,

            "/api/status": endpoint_status,
            "/api/setup": endpoint_setup,
            "/api/libraries": endpoint_library_index
        },

        development: process.env.NODE_ENV !== "production" && {
            hmr: false,
        },
    });
}