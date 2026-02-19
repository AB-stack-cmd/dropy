import dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';

dotenv.config({path:"./env"})


  if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set in .env.local");
  }

export default defineConfig({
  out: './drizzle',
  schema: './app/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
