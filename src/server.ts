import { spawn } from "bun";
import { StartServer } from "./api";
import { MediaDatabase, UsersDatabase } from "./utils/database";


async function Main() {
  await MediaDatabase.LoadDatabase();
  await UsersDatabase.LoadDatabase();

  const server = StartServer()
  
  console.log(`🚀 Server running at ${server.url}`);
  const url = server.url.toString()
  

  if (process.env.NODE_ENV !== "production") return;
  // Open browser after server starts
  if (process.platform === "win32") {
    spawn(["cmd", "/c", "start", "", url]);
  } else if (process.platform === "darwin") {
    spawn(["open", url]);
  } else {
    spawn(["xdg-open", url]);
  }
}

Main()

