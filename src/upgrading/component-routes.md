# 从 Component Routes 进行框架改造

如果你正在使用 `<RouterProvider>`，请查看[从 RouterProvider 进行框架改造](router-provider)的相关内容。

如果你正在使用 `<Routes>`，那你来对地方了。

React Router 的 Vite 插件为 React Router 添加了框架特性。本指南将帮助你在自己的应用程序中采用该插件。如果你遇到任何问题，请通过 [Twitter](https://x.com/remix_run) 或 [Discord](https://rmx.as/discord) 寻求帮助。

## 特性

Vite 插件添加了以下功能：

- 路由 loaders、actions 以及自动数据重新验证
- 类型安全的路由模块
- 自动路由代码拆分
- 跨导航的自动滚动恢复
- 可选的静态预渲染
- 可选的服务器端渲染

项目一开始可能在配置上会花费你很多时间。不过，一旦完成这些配置，你就可以逐步添加新特性，每次针对一条路由进行（添加新功能的操作）。

## 前提条件

使用 Vite 插件，你的项目需要满足以下条件：

- Node.js 20+ （如果使用 Node 作为你的运行时环境）
- Vite 5+

## 1. 安装 Vite 插件

👉 **安装 React Router Vite 插件**

```sh
npm install -D @react-router/dev
```

👉 **安装一个运行时适配器**

假设你使用 Node 作为你的运行时环境。

```sh
npm install @react-router/node
```

👉 **用 React Router 替换掉 React 插件**

::: code-group
```ts [vite.config.ts]
import react from '@vitejs/plugin-react' // [!code --]
import { reactRouter } from "@react-router/dev/vite"; // [!code ++]
import { defineConfig } from "vite";


export default defineConfig({
  plugins: [
    react() // [!code --]
    reactRouter() // [!code ++]
  ],
});
```
:::

## 2. 创建路由配置

👉 **创建 `react-router.config.ts` 文件**

::: code-group
```ts [react-router.config.ts]
import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "src",
  ssr: false,
} satisfies Config;
```
:::

## 3. 添加根入口点

在典型的 Vite 应用程序中，`index.html` 文件是打包的入口点。而 React Router 的 Vite 插件会将入口点转移到 `root.tsx` 文件，这样你就可以使用 React 来渲染应用程序的外壳，而非静态 HTML，并且如果你愿意的话，最终还能升级到服务器端渲染。 

👉 **将你现有的 `index.html` 文件内容迁移到 `root.tsx` 文件中**

例如，如果你有一个 `index.html` 文件，内容如下：

::: code-group
```html [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>My App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```
:::

你需要将那些标记（指原来 `index.html` 里的相关内容）移到 `src/root.tsx` 文件中，并删除 `index.html` 文件。

```sh
touch src/root.tsx
```

::: code-group
```tsx [src/root.tsx]
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

export function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>My App</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}
```
:::

## 4. 添加客户端入口模块

在典型的 Vite 应用程序中，`index.html` 文件将 `src/main.tsx` 指定为客户端入口点。而 React Router 使用名为 `src/entry.client.tsx` 的文件作为客户端入口点来替代它。

👉 **将 `src/entry.client.tsx` 设置为你的入口点**

如果你当前的 `src/main.tsx` 文件内容如下所示：

::: code-group
```tsx [src/main.tsx]
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```
:::

你需要将它重命名为 `entry.client.tsx`，并将其内容修改成如下这样：

::: code-group
```tsx [src/entry.client.tsx]
import React from "react";
import ReactDOM from "react-dom/client";
import { HydratedRouter } from "react-router/dom";
import "./index.css";

ReactDOM.hydrateRoot(
  document,
  <React.StrictMode>
    <HydratedRouter />
  </React.StrictMode>
);
```
:::

- 使用 `hydrateRoot` 替代 `createRoot`。
- 使用 `<HydratedRouter>` 组件渲染，替代 `<App/>` 组件。

注意：我们不再渲染 `<App/>` 组件了。我们会在后续步骤中把它加回来，但首先我们希望应用能通过新的入口点启动起来。 

## 5. 调整相关内容布局

在 `root.tsx` 和 `entry.client.tsx` 这两个文件之间，你可能需要对它们包含的一些内容进行相应的调整布局。 

一般来说：

- `root.tsx` 文件包含诸如上下文提供、布局、样式等任何与渲染相关的内容。
- `entry.client.tsx` 文件应当尽可能保持简洁。

记住，暂时先不要尝试去渲染你现有的 `<App/>` 组件，我们会在后续步骤中进行此项操作。 

请注意，你的 `root.tsx` 文件将会被静态生成，并作为应用程序的入口点提供服务，所以只有该模块需要与服务器端渲染相兼容。这就是你大部分问题将会出现的地方。 

## 6. 设置你的路由

React Router 的 Vite 插件使用 `routes.ts` 文件来配置路由。目前，我们将添加一个简单的通用路由（兜底路由）来让程序先运行起来。

👉 **安装 `catchall.tsx` 兜底路由**

```sh
touch src/routes.ts src/catchall.tsx
```

::: code-group
```tsx [src/routes.ts]
import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  // * 匹配所有的URL，“?” 使其成为可选的，所以它也会匹配 “/”（根路径）。
  route("*?", "catchall.tsx"),
] satisfies RouteConfig;
```
:::

👉 **渲染一个占位路由**

最终我们会用原来的 `App` 组件替换它，但现在我们只是渲染一些简单的内容，以确保应用程序能够启动。

::: code-group
```tsx [src/catchall.tsx]
export default function Component() {
  return <div>Hello, world!</div>;
}
```
:::

[查看我们关于配置路由的指南](../framework/routing)，以了解更多有关 `routes.ts` 文件的信息。

## 7. 启动应用程序

到了这一步，你应该能够启动应用程序，并看到根布局了。

👉 **添加 `dev` 脚本并运行**

::: code-group
```json [package.json]
"scripts": {
  "dev": "react-router dev"
}
```
:::

现在，在继续下一步之前，请确保此时你的应用程序能够启动：

```sh
npm run dev
```

## 8. 渲染你的 `<App/>` 组件

现在回过头来渲染你的 `<App />`，我们将更新之前设置的那个能匹配所有 URL 的“通用（兜底）”路由，以便你现有的 `<Routes>` 组件有机会进行渲染。 

::: code-group
```tsx [src/catchall.tsx]
import App from "./App";

export default function Component() {
  return <App />;
}
```
:::

现在你的应用程序应该能重新显示在屏幕上，并且像往常一样正常运行了！

## 9. 将一条路由迁移到路由模块

现在，你可以逐步将你的路由迁移到路由模块中。

假设有如下这样一条现有的路由：

::: code-group
```tsx [src/App.tsx]
// ...
import About from "./containers/About";

export default function App() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
```
:::

👉 **将路由定义添加到 `routes.ts` 文件中**

::: code-group
```tsx [src/routes.ts]
import {
  type RouteConfig,
  route,
} from "@react-router/dev/routes";

export default [
  route("/about", "./pages/about.tsx"),
  route("*?", "catchall.tsx"),
] satisfies RouteConfig;
```
:::

👉 **添加路由模块**

[使用路由模块 API](../framework/route-module) 编辑路由模块：

::: code-group
```tsx [src/pages/about.tsx]
export async function clientLoader() {
  // 这里可以 fetch 数据
  return {
    title: "About page",
  };
}

export default function Component({ loaderData }) {
  return <h1>{loaderData.title}</h1>;
}
```
:::

查看[类型安全](../how-tos/route-module-type-safety)部分，为参数、加载器数据等设置自动生成的类型安全机制。

你迁移的前几条路由是最困难的，因为通常你必须以与之前稍有不同的方式来访问各种抽象内容（比如从加载器中访问，而不是通过钩子函数或上下文来访问）。不过，一旦处理好了这些最棘手的部分，后续就可以按部就班地逐步进行迁移了。 

## 启用服务器端渲染 和/或 预渲染

如果你想要启用服务器端渲染以及静态预渲染，你可以通过打包插件中的 `ssr` 和 `prerender` 选项来实现。对于服务器端渲染，你还需要将服务器构建版本部署到服务器上。如需了解更多信息，请查看[部署](https://reactrouter.com/start/deploying)相关内容。 

::: code-group
```ts [react-router.config.ts]
import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  async prerender() {
    return ["/", "/about", "/contact"];
  },
} satisfies Config;
```
:::