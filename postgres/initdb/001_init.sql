-- 例としてユーザー名とメールアドレスを格納するテーブルを作成し、初期データを挿入するSQLスクリプト
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

INSERT INTO users (name, email)
VALUES
  ('Taro', 'taro@example.com'),
  ('Hanako', 'hanako@example.com')
ON CONFLICT (email) DO NOTHING;
