# Mini Game Hub - H5游戏出海聚合站

纯静态站，无需框架，部署到 Vercel/Netlify/Cloudflare Pages。

## 目录结构
```
├── index.html          # 首页：热门推荐 + 分类导航
├── game.html           # 游戏详情页：iframe嵌入 + 广告位
├── css/style.css       # 全局样式
├── js/games.js         # 游戏数据（JSON数组）
├── js/main.js          # 首页逻辑
├── js/game.js          # 详情页逻辑
├── data/               # 可扩展的游戏数据源
```

## 规则
- 纯静态，不引入任何框架/CDN依赖
- 游戏数据在 js/games.js 中维护，方便手动更新
- 广告位预留 Google AdSense 代码位
- 所有页面需有完整 OG meta 标签（SEO）
- iframe 游戏源来自 GamePix/GameMonetize 等允许嵌入的平台
