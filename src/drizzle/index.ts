import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Only create the database connection if we're on the server side
const createDb = () => {
  if (typeof window !== "undefined") {
    throw new Error("Database can only be accessed on the server side");
  }

  const client = postgres(process.env.DATABASE_URL as string);
  return drizzle({
    client,
    schema: {
      ...schema,
    },
  });
};

// Export the database instance
export const db = createDb();
