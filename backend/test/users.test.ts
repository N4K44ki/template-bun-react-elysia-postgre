import { describe, expect, test, mock } from "bun:test";

mock.module("../src/db/client", () => ({
  db: async (...args: unknown[]) => {
    const [strings] = args as [TemplateStringsArray];
    const sql = strings.join(" ").trim();

    if (sql.includes("FROM users")) {
      return [{ id: 1, name: "Taro", email: "taro@example.com" }];
    }

    return [{ ok: 1 }];
  }
}));

const { app } = await import("../src/index");

describe("backend routes", () => {
  test("GET /health", async () => {
    const response = await app.handle(new Request("http://localhost/health"));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.ok).toBe(true);
  });

  test("GET /users", async () => {
    const response = await app.handle(new Request("http://localhost/users"));
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(json)).toBe(true);
    expect(json[0].name).toBe("Taro");
  });
});
