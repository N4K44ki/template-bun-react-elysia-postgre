import { Elysia } from "elysia";
import { db } from "../db/client";

export const healthRoutes = new Elysia()
  .get("/health", async () => {
    const rows = await db`SELECT 1 AS ok`;
    return {
      ok: rows[0]?.ok === 1,
      message: "hello from Elysia + PostgreSQL"
    };
  });
