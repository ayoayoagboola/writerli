import * as schema from "./db/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

// added db.ts

const connectionString = process.env.DATABASE_URL!;

const client = new Pool({ connectionString });
export const db = drizzle(client, { schema });
