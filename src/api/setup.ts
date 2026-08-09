import { configTable } from '@/db/users-schema/config';
import { UsersDatabase } from "@/utils/database";
import { eq } from "drizzle-orm";

type REQ = Bun.BunRequest<"/api/setup">;
const ConfigKey_SetupFinished = "is-setup-finished"
const ConfigKey_SetupPage = "current-setup-page"

const ROUTE = {
    GET: async (req: REQ) => {
        const db = UsersDatabase.GetDatabase()
        const isFinished = db.select().from(configTable).where(eq(configTable.name, ConfigKey_SetupFinished)).get()
        const page = db.select().from(configTable).where(eq(configTable.name, ConfigKey_SetupPage)).get()
        return Response.json({
            isFinished: isFinished?.value === "TRUE",
            page: page?.value
        });
    },
    POST: async (req: REQ) => {
        const body = await req.json();
        const db = UsersDatabase.GetDatabase()
        const page = body.page;
        if (page !== undefined) {
            console.log("setting page", page)
            db.insert(configTable).values({ name: ConfigKey_SetupPage, value: page }).onConflictDoUpdate({
                target: configTable.name,
                set: {
                    value: page
                }
            }).run()
        }

        if (body.isFinished) {
            db.insert(configTable).values({ name: ConfigKey_SetupFinished, value: "TRUE" }).run()
            return Response.json({message: "Finished Setup Successfully"});
        }
        return Response.json({message: "No Op"});
    },
}

export default ROUTE;