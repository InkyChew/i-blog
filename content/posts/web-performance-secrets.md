---
title: "告別網頁閃爍與卡頓：Next.js Image 組件與 Core Web Vitals 優化指南"
createAt: "2026-05-18T15:34:00+08:00"
category: "Web 開發"
description: "深入拆解 Next.js 內建 Image 元件的底層優化機制，解決最具挑戰性的 LCP 與 CLS 效能瓶頸。"
---

網頁載入速度慢一秒，電商網站就會損失 7% 的轉化率；對於個人品牌來說，卡頓的網頁則會直接降低訪客對你專業能力的信任度。

Google 的 Core Web Vitals（網站核心效能指標）中，最常讓人頭痛的兩個指標就是：
1. **LCP (Largest Contentful Paint)**：最大內容渲染時間，通常是你的 Hero 區塊大圖。
2. **CLS (Cumulative Layout Shift)**：累積版面配置位移，也就是俗稱的「網頁元件跳動閃爍」。

## Next.js `<Image>` 如何拯救效能？

原生的 HTML `<img>` 標籤會照單全收你上傳的 5MB 高解析度大圖。但 Next.js 的 `next/image` 組件會在後台自動做三件事：

* **自動縮圖**：根據使用者的螢幕大小，自動裁剪出最適合的解析度。
* **格式優化**：自動將 PNG/JPG 轉換為現代高效的 WebP 或 AVIF 格式，體積直接縮減 70%。
* **防閃爍（CLS 優化）**：透過強制的寬高比或 `fill` 屬性，在圖片尚未下載完成前就預留好正確的骨架空間，網頁再也不會亂跳動。