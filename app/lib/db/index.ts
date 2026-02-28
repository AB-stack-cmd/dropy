import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"

// neon db
export const sql = neon(process.env.DATABASE_URL!);
<<<<<<< HEAD

export  const db = drizzle(sql,{schema});
=======
export const db = drizzle({ client: sql });
>>>>>>> 978e173f41ca8dc405992f5c0f407cd6ce213b39


