import { useEffect, useState } from "react";

type HealthResponse = {
  ok: boolean;
  message: string;
};

type User = {
  id: number;
  name: string;
  email: string;
};

/**
 * 画面全体を構成するルートコンポーネント。
 *
 * 初回表示時に backend の health API と users API を呼び出し、
 * 取得した結果を画面に表示する。
 */
export function App() {
  const [message, setMessage] = useState("loading...");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    /**
     * backend との接続確認用 API を呼び出し、応答メッセージを表示する。
     */
    fetch("/api/health", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("health request failed");
        return res.json() as Promise<HealthResponse>;
      })
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("backend に接続できません"));

    /**
     * ユーザー一覧 API を呼び出し、取得したユーザーを画面に反映する。
     */
    fetch("/api/users", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error("users request failed");
        return res.json() as Promise<User[]>;
      })
      .then((data) => setUsers(data))
      .catch(() => setUsers([]));

    return () => controller.abort();
  }, []);

  return (
    <main style={{ fontFamily: "sans-serif", padding: "2rem", lineHeight: 1.6 }}>
      <h1>Bun + React + PostgreSQL</h1>
      <p>backend message: {message}</p>

      <section>
        <h2>users</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} / {user.email}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
