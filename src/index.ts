import { serve, spawn } from "bun";
import index from "./index.html";

async function GETHello (req:Bun.BunRequest) {
  return Response.json({
    message: "Hello, world! My Bun",
    method: "GET",
  });
}

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      GET:GETHello,
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
const url = server.url.toString()

// Open browser after server starts
if (process.platform === "win32") {
  spawn(["cmd", "/c", "start", "", url]);
} else if (process.platform === "darwin") {
  spawn(["open", url]);
} else {
  spawn(["xdg-open", url]);
}