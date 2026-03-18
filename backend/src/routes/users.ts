import { Elysia } from "elysia";
import { db } from "../db/client";

type UserRow = {
  id: number;
  name: string;
  email: string;
};

export const userRoutes = new Elysia()
  .get("/users", async () => {
    const rows = await db<UserRow>`
      SELECT id, name, email
      FROM users
      ORDER BY id ASC
    `;
    return rows;
  });
