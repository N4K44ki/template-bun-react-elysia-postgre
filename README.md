# Bun + React + Elysia + PostgreSQL (Docker Compose)

Bun 中心でTypescriptでwebアプリを作成する際の最小構成(データベース込み)です。

- frontend: Bun + React
- backend: Bun + Elysia
- database: PostgreSQL
- orchestration: Docker Compose

## git clone して最初にすること
- secretsディレクトリにファイルを作成  
    それぞれデータベース名、パスワード、ユーザー名を何でもいいので書いたファイルを用意する
    - db_name.txt
    - db_password.txt
    - db_user.txt
- .envの作成
``` example
POSTGRES_HOST=postgres
POSTGRES_PORT=5433

BACKEND_PORT=4001
FRONTEND_PORT=3001

NODE_ENV=development
API_ORIGIN=http://backend:4001
```
## 詳細を理解したい場合は
learn-base.mdを参照してください

## 起動

```bash
docker compose up --build
```

## 動作確認

- Frontend: http://localhost:3001
- Health: http://localhost:3001/api/health
- Users API: http://localhost:3001/api/users

## 主要ポイント

- PostgreSQL は **別コンテナ**
- backend だけが DB に接続
- Bun 組み込みの `SQL` を使用
- 初期データは `postgres/initdb/001_init.sql` で投入

## 停止

```bash
docker compose down
```

データも消す場合:

```bash
docker compose down -v
```

## テスト

```bash
docker compose exec backend bun test
docker compose exec frontend bun test
```
