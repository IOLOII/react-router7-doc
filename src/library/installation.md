# 安装

你可以用 Vite 脚手架工具创建一个项目，并选择 `React` 模板，除此之外你也可以用自己喜欢的工具启动程序。

```sh
npx create-vite@latest
```

接下来从 npm 安装 React Router 依赖：

```sh
npm i react-router
```

最后，在你的应用程序外层渲染一个 `<BrowserRouter>` 组件：

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./app";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```
