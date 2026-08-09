import { drizzle, SQLiteBunDatabase } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';
import { eq } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/bun-sqlite/migrator';



class BaseDatabase {
    static db: SQLiteBunDatabase & {
        $client: Database;
    } | undefined = undefined;

    static DBFilePath = "lfmpdata/sqlite.db"
    static MigrationPath = "./drizzle"
    static firstBoot:boolean = true;


    static async LoadDatabase() {
        const dbfile = Bun.file(this.DBFilePath);
        if (await dbfile.exists()) {
            this.firstBoot = false;
        } else {
            await dbfile.write("")
            await dbfile.delete()
        }

        const sqlite = new Database(this.DBFilePath);
        this.db = drizzle({ client: sqlite });
        
        migrate(this.db, { migrationsFolder:this.MigrationPath });

        console.log(`Database created.`)
    }

    static GetDatabase() {
        if (this.db == undefined) throw "Database accessed before initialization";
        return this.db;
    }
}

export class MediaDatabase extends BaseDatabase {
    static override DBFilePath = "lfmp-media.db"
    static override MigrationPath = "./drizzle/media"
}

export class UsersDatabase extends BaseDatabase {
    static override DBFilePath = "lfmp-userdata.db"
    static override MigrationPath = "./drizzle/users"
}
