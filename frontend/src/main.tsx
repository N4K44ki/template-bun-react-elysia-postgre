import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

/**
 * ブラウザ側のエントリーポイント。
 *
 * `index.html` 内の `id="root"` を持つ要素を取得し、
 * その領域に React アプリケーションを描画する。
 */
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("root element not found");
}

createRoot(rootElement).render(<App />);
