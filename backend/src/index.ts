import { Elysia } from "elysia";
import { healthRoutes } from "./routes/health";
import { userRoutes } from "./routes/users";

export const app = new Elysia()
  .get("/", () => ({ ok: true, service: "backend" }))
  .use(healthRoutes)
  .use(userRoutes);

const port = Number(process.env.PORT ?? 4000);

app.listen(port);

console.log(`backend listening on http://localhost:${port}`);
