import { describe, expect, test } from "bun:test";
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "../src/App";

describe("App", () => {
  test("renders title", async () => {
    const div = document.createElement("div");
    document.body.appendChild(div);

    globalThis.fetch = ((input: RequestInfo | URL) => {
      const url = String(input);

      if (url.includes("/api/health")) {
        return Promise.resolve(
          new Response(JSON.stringify({ ok: true, message: "hello from test" }), {
            headers: { "content-type": "application/json" }
          })
        );
      }

      return Promise.resolve(
        new Response(JSON.stringify([{ id: 1, name: "Taro", email: "taro@example.com" }]), {
          headers: { "content-type": "application/json" }
        })
      );
    }) as typeof fetch;

    const root = createRoot(div);
    root.render(<App />);

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(div.textContent).toContain("Bun + React + PostgreSQL");
  });
});
