import { defineConfig } from "drizzle-kit";
import "dotenv/config";

// defined drizzle.config.ts

export default defineConfig({
  schema: "./db/schema.ts",
  dialect: "postgresql",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
    database: "postgres",
    port: 5432,
    host: "aws-0-us-west-1.pooler.supabase.com",
    user: "postgres.fvfrsliskgekptlghmir",
    password: process.env.PW || "",
  },
});
