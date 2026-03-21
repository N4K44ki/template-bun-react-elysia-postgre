import index from "./index.html";

/**
 * フロントエンド用の Bun サーバー。
 *
 * React アプリのエントリとなる HTML を配信しつつ、
 * `/api/*` へのリクエストを backend コンテナへ中継する。
 */
// フロントエンドのポート番号を環境変数から取得
const port = Number(Bun.env.FRONTEND_PORT);
// backend コンテナの URL (例: "http://backend:3001") を環境変数から取得
const apiOrigin = Bun.env.API_ORIGIN; 

/**
 * 受け取ったリクエストを backend 側の指定パスへ転送する。
 *
 * 元の HTTP メソッド、ヘッダー、クエリ文字列、リクエストボディをできるだけ維持し、
 * フロントエンドとバックエンドの間の薄いプロキシとして振る舞う。
 *
 * @param pathname backend 側で解決したいパス
 * @param req ブラウザまたはクライアントから受け取った元のリクエスト
 * @returns backend から返されたレスポンス
 */
async function proxy(pathname: string, req: Request): Promise<Response> {
  const url = new URL(req.url);
  const upstreamUrl = new URL(pathname, apiOrigin);

  if (url.search) {
    upstreamUrl.search = url.search;
  }

  const init: RequestInit = {
    method: req.method,
    headers: req.headers,
    body: req.method === "GET" || req.method === "HEAD" ? undefined : req.body,
    duplex: "half" as RequestDuplex
  };

  return fetch(upstreamUrl, init);
}

/**
 * Bun.serve を使ってサーバーを起動し、ルーティングを設定する。
 *
 * ルーティングの優先順位は以下の通り：
 * 1. ルートパス "/" へのリクエストは index.html を返す。
 * 2. "/api/health" と "/api/users" へのリクエストは proxy 関数で backend に転送する。
 * 3. その他の "/api/*" パスへのリクエストも proxy 関数で backend に転送する。
 * 4. 上記以外のリクエストは全て index.html を返す（React Router のため）。
 *
 * サーバーが起動したら、コンソールにアクセス URL を表示する。
 */
Bun.serve({
  port,
  routes: {
    "/": index,
    "/api/health": (req) => proxy("/health", req),
    "/api/users": (req) => proxy("/users", req)
  },
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname.startsWith("/api/")) {
      const path = url.pathname.replace(/^\/api/, "") || "/";
      return proxy(path, req);
    }

    return index;
  }
});

console.log(`frontend listening on http://localhost:${port}`);
