---
title: "Next.js 搭配 Tailwind CSS v4 實戰：打造現代化響應式架構"
createAt: "2026-05-18T15:34:00+08:00"
category: "Web 開發"
description: "深入探討 Tailwind CSS v4 的全新變革，並實戰展示如何結合 Next.js App Router 建立原生支援暗黑模式的設計系統。"
---

隨著前端技術的演進，Tailwind CSS v4 帶來了革命性的改變。最顯著的突破在於它完全拋棄了舊有的 `tailwind.config.js`，全面改用 CSS 變數（CSS Variables）與新的 `@theme` 指令來宣告主題。

## 為什麼選擇 Tailwind CSS v4？

1. **極致的編譯速度**：採用全新 Rust 核心重寫，編譯速度提升高達 10 倍。
2. **原生 CSS 變數支援**：現在你的配置直接寫在全域 CSS 檔案中，瀏覽器原生就能讀取，這讓動態抽換主題或設計系統變得空前簡單。
3. **更精簡的程式碼**：不再需要引入大量的設定檔，專案結構大幅輕量化。

## 核心設定心法

在 Next.js 的設計中，我們可以直接在 `app.css` 中透過 `.dark` 類別來完美控制手動切換暗黑模式。

這意味著我們能將設計系統與瀏覽器的 DOM 完全綁定，利用不透明度簡寫語法如 `bg-foreground/[0.02]`，在不寫一行額外 JavaScript 的情況下，完美適配淺色與深色模式。