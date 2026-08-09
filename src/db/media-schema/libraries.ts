import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const librariesTable = sqliteTable("libraries", {
    id: integer().primaryKey(),
    name: text().notNull().unique(),
    value: text()
});