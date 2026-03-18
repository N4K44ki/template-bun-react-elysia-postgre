# このプロジェクトを理解する

## 1. docker containerについて
コンテナとは作成、複製、配布が簡単な仮想環境。  
このプロジェクトではcompose.yamlで3つのコンテナを作成している。
1. フロントエンドコンテナ
2. バックエンドコンテナ
3. データベースコンテナ

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