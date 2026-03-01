import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless"
import * as dotenv from "dotenv"

dotenv.config({path:'./env'});

const db_url = process.env.DATABASE_URL;

if(!db_url){
    throw new Error("DATABASE_URL is not set in .env")
}


/**
 * Migration update the db schema if any row or column is added
 * change the schema and migration update the DB
 */
async function Migration() {
    try {
        const sql = neon(process.env.DATABASE_URL!);

        const db = drizzle(sql)


        console.log("running migration.. from folder ")
        await migrate(db,{migrationsFolder :" ./drizzle"})

        console.log("DB migration completed successfully")
    }catch(err){
        console.error(`Migration failed ${err}`);
        process.exit(1)

    };
};

Migration();