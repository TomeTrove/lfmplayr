import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const configTable = sqliteTable("configs", {
    id: integer().primaryKey(),
    name: text().notNull().unique(),
    value: text()
});