---
next: false
---

# 自定义框架

通常可以借助 `@react-router/dev` 来利用 React Router 的各种框架特性，但如果不想使用它，也是有办法将 React Router 的框架特性（如加载器、动作、数据获取器等）集成到自己的打包器和服务器抽象层当中的。

## 客户端渲染

### 1. 创建一个路由

在 React Router 框架中，`createBrowserRouter` 是一个极为关键的浏览器运行时 API，它承担着启用路由模块相关 API（如加载器、动作等）的重要职责，以下为你详细介绍它的相关情况。

它接收一个由路由对象组成的数组作为参数，这些路由对象具备支持加载器、动作、错误边界等诸多特性的能力。

在基于 Vite 构建的 React 项目中，如果使用了 React Router，其配套的 Vite 插件提供了一种便捷的方式来生成 createBrowserRouter 所需的路由对象数组。通常，开发者会在 `routes.ts` 文件中按照一定的格式和规则定义路由相关的信息，然后插件会自动解析这个文件，将其中的路由配置转换为符合要求的路由对象数组。

如果开发者不想依赖于特定的插件或者希望对路由配置有更精细化的控制，也可以手动创建路由对象数组，或者借助自定义的抽象层来生成符合要求的数组，再结合自己选择的打包器（如 Webpack、Rollup 等）来处理项目。

```ts
import { createBrowserRouter } from "react-router";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "shows/:showId",
        Component: Show,
        loader: ({ request, params }) =>
          fetch(`/api/show/${params.id}.json`, {
            signal: request.signal,
          }),
      },
    ],
  },
]);
```

### 2. 渲染路由

然后使用 `<RouterProvider>` 把路由渲染到浏览器中。

```tsx
import { createBrowserRouter, RouterProvider } from "react-router";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
```

### 3. 懒加载

在 React Router 中，lazy 属性为路由提供了一种非常实用的懒加载机制，它允许路由在需要的时候才去加载对应的组件及其相关定义，而不是在应用启动时就一次性全部加载：

```tsx
createBrowserRouter([
  {
    path: "/show/:showId",
    lazy: () => {
      let [loader, action, Component] = await Promise.all([
        import("./show.action.js"),
        import("./show.loader.js"),
        import("./show.component.js"),
      ]);
      return { loader, action, Component };
    },
  },
]);
```

## 服务度渲染

在进行服务器端渲染并采用自定义设置时，有一些服务器端的 API 可用于渲染以及数据加载操作。

本介绍只是让你对服务器端渲染自定义设置以及相关 API 的工作原理有个大致了解，如果想要更深入地理解具体的实现细节、代码示例以及各种复杂场景下的应用方式等内容，可以查看[自定义框架示例仓库](https://github.com/remix-run/custom-react-router-framework-example)。

### 1. 定义你的路由

同客户端路由定义方式一样。

```ts
export default [
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "shows/:showId",
        Component: Show,
        loader: ({ params }) => {
          return db.loadShow(params.id);
        },
      },
    ],
  },
];
```

### 2. 创建一个静态处理器

使用 `createStaticHandler` 将路由转换为请求处理器。

```ts
import { createStaticHandler } from "react-router";
import routes from "./some-routes";

let { query, dataRoutes } = createStaticHandler(routes);
```

### 3. 获取路由上下文和渲染函数

React Router 被设计为能够与 [Web Fetch 请求](https://developer.mozilla.org/en-US/docs/Web/API/Request) 协同工作，以实现诸如数据获取、表单提交以及页面导航等功能。然而，当服务器端所使用的请求对象类型与 Web Fetch 对象不一致时，就需要进行相应的适配操作。

假设你的服务端接收的是 `Request` 对象。

```ts
import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";

import routes from "./some-routes.js";

let { query, dataRoutes } = createStaticHandler(routes);

export async function handler(request: Request) {
  // 1. 调用 `query` 运行 actions/loaders 获取路由上下文
  let context = await query(request);

  // 如果 `query` 返回一个 Response，直接返回它（可能是一个重定向）
  if (context instanceof Response) {
    return context;
  }

  // 2. 创建一个静态路由用于服务端渲染
  let router = createStaticRouter(dataRoutes, context);

  // 3. 使用 StaticRouterProvider 渲染所有内容
  let html = renderToString(
    <StaticRouterProvider router={router} context={context} />
  );

  // 设置来自 action 和 loaders 的请求头，基于最深匹配原则
  let leaf = context.matches[context.matches.length - 1];
  let actionHeaders = context.actionHeaders[leaf.route.id];
  let loaderHeaders = context.loaderHeaders[leaf.route.id];
  let headers = new Headers(actionHeaders);
  if (loaderHeaders) {
    for (let [key, value] of loaderHeaders.entries()) {
      headers.append(key, value);
    }
  }

  headers.set("Content-Type", "text/html; charset=utf-8");

  // 4. 返回一个客户端响应
  return new Response(`<!DOCTYPE html>${html}`, {
    status: context.statusCode,
    headers,
  });
}
```

### 4. 在浏览器中进行水合

在服务器端渲染的流程中，当服务器生成好要发送给客户端的 HTML 内容时，会将水合作用数据以特定的形式嵌入到 HTML 页面中，通常会挂载到 `window.__staticRouterHydrationData` 属性上。

当客户端接收到包含水合作用数据的 HTML 页面后，就可以利用 window.\_\_staticRouterHydrationData 中的数据来初始化客户端的路由器并渲染 `<RouterProvider>` 组件，实现页面从静态到动态的转换以及后续的交互功能。

```tsx
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import routes from "./app/routes.js";
import { createBrowserRouter } from "react-router";

let router = createBrowserRouter(routes, {
  hydrationData: window.__staticRouterHydrationData,
});

hydrateRoot(
  document,
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
```
