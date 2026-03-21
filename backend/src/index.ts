import { Elysia } from "elysia";
import { healthRoutes } from "./routes/health";
import { userRoutes } from "./routes/users";

const port = Number(Bun.env.BACKEND_PORT);

export const app = new Elysia()
  .get("/", () => ({ ok: true, service: "backend" }))
  .use(healthRoutes)
  .use(userRoutes)
  .listen(port);

console.log(`backend listening on http://localhost:${port}`);
