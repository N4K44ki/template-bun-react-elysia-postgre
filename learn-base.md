# このプロジェクトを理解する

## 1. docker containerについて
コンテナとは作成、複製、配布が簡単な仮想環境。  
このプロジェクトではcompose.yamlで3つのコンテナを作成している。
1. フロントエンドコンテナ
2. バックエンドコンテナ
3. データベースコンテナ

## 1.5 技術の選定
言語はフロントエンドもバックエンドもTypescript。シンプルさを重視して同じ言語を使用。
せっかく自由に選べる個人開発ならモダンにしてみたいということでBunを中心に選んでみました。

フロントエンド: Bun + React  
バックエンド： Bun + Elysia  
データベース： PostgreSQL  

BunはTypescript(Javascript)の
- ランタイム（実行環境）
- トランスパイラ（Typescript->Javascriptに変換）
- バンドラ（配布しやすい形にファイルをまとめて出力する）
- テストランナー（テストの実行）
- パッケージマネージャ（Javascriptではほかにnpmなどがある。pythonでいうpipやuvに相当）
が簡単に使用できるtool。Zig言語で書かれている。

蛇足：
- 名前から察する人もいるかもですがElysiaの作者は崩壊3rd好きなはず（公式チュートリアルの中で/flame-chasers/とか出てくる。https://elysiajs.com/tutorial/getting-started/your-first-route/）

## 2. フロントエンドコンテナを理解する
frontendディレクトリ内のDockerfileに従ってコンテナを作成している。
基本的にはtypescript(javascript)を動かすために必要なbunのイメージからコンテナを作成
```CMD ["bun", "--hot", "src/server.ts"]```
でホットリロードでserver.tsを起動している。

### server.tsの中身
基本的には`Bun.serve()`でHTTPサーバーを立ち上げるのがメインの役割
ファイルの流れは
sever.ts  
リクエストがフロントエンドのURL/の場合  
-> index.html  
-> main.tsx  
-> App.tsx  

リクエストがフロントエンドのURL/api/healthの場合  
-> バックエンドのapiに転送