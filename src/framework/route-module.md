# 路由模块

在 `routes.ts` 文件中所引用的文件被称作路由模块。

::: code-group

```ts [app/routes.ts]
route("teams/:teamId", "./team.tsx"),
//                路由模块 ^^^^^^^^

```

:::

路由模块是 React Router 框架功能的基础，它们定义了以下内容：

- 自动代码分割
- 数据加载
- Actions
- 重新验证
- 错误边界
- 其他功能

本指南只是对每个路由模块功能进行了简要概述，后续的入门指南将会更详细地涵盖这些功能，以帮助开发者更深入地理解和运用它们来构建高质量、功能完备的 Web 应用路由体系。

## 组件(default)

在路由匹配时，定义的组件将会被渲染。

::: code-group

```tsx [app/routes/my-route.tsx]
export default function MyRouteComponent() {
  return (
    <div>
      <h1>Look ma!</h1>
      <p>I'm still using React Router after like 10 years.</p>
    </div>
  );
}
```

:::

## loader

路由加载器（Route loaders）会在路由组件被渲染之前为其提供数据。它们仅在服务器端渲染（server rendering）时在服务器上被调用，或者在预渲染（pre-rendering）构建过程中被调用。

```tsx
export async function loader() {
  return { message: "Hello, world!" };
}

export default function MyRoute({ loaderData }) {
  return <h1>{loaderData.message}</h1>;
}
```

也可参考：

- [loader 参数](https://api.reactrouter.com/v7/interfaces/react_router.LoaderFunctionArgs)

## clientLoader

仅在浏览器中被调用，路由客户端加载器（route client loaders）除了可以补充路由加载器（route loaders）所提供的数据之外，也能够替代路由加载器，为路由组件提供数据。

```tsx
export async function clientLoader({ serverLoader }) {
  // 服务端加载器调用
  const serverData = await serverLoader();
  // 和/或 客户端数据获取
  const data = getDataFromClient();
  // 通过 `useLoaderData()` 来返回要暴露（提供）的数据
  return data;
}
```

客户端加载器（Client loaders）能够通过在函数上设置 `hydrate` 属性，参与服务器端渲染页面的初始页面加载水合（initial page load hydration）过程：

```tsx
export async function clientLoader() {
  // ...
}
clientLoader.hydrate = true as const;
```

> [!TIP] 提示：
> 通过使用 `as const`，TypeScript 将会推断出 `clientLoader.hydrate` 的类型为 `true` 而非 `boolean` 类型。这样一来，React Router 就能够基于 `clientLoader.hydrate` 的值来推导出 `loaderData` 的类型了。

也可参考：

- [clientLoader 参数](https://api.reactrouter.com/v7/types/react_router.ClientLoaderFunctionArgs)

## action

路由操作（Route actions）允许进行服务器端的数据变更，并且当从 `<Form>`、`useFetcher` 以及 `useSubmit` 进行调用时，会自动重新验证页面上所有的加载器（loader）数据：

```tsx
// route("/list", "./list.tsx")
import { Form } from "react-router";
import { TodoList } from "~/components/TodoList";

// action 完成后数据才会加载...
export async function loader() {
  const items = await fakeDb.getItems();
  return { items };
}

// ...以便此处的列表能够自动更新
export default function Items({ loaderData }) {
  return (
    <div>
      <List items={loaderData.items} />
      <Form method="post" navigate={false} action="/list">
        <input type="text" name="title" />
        <button type="submit">Create Todo</button>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const todo = await fakeDb.addItem({
    title: data.get("title"),
  });
  return { ok: true };
}
```

## clientAction

就像 action 一样，不过它仅在浏览器中被调用：

```tsx
export async function clientAction({ serverAction }) {
  fakeInvalidateClientSideCache();
  // 如果有需要的话，仍然可以调用服务器端操作（server action）
  const data = await serverAction();
  return data;
}
```

也可参考：

- [clientAction 参数](https://api.reactrouter.com/v7/types/react_router.ClientActionFunctionArgs)

## ErrorBoundary

当其他路由模块的应用程序接口（APIs）抛出异常时，路由模块的错误边界（`ErrorBoundary`）将会替代路由组件进行渲染：

```tsx
import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
```

## HydrateFallback

在初始页面加载时，只有在客户端加载器（client loader）完成工作之后，路由组件才会进行渲染。如果（相关内容）被导出，那么一个水合回退（`HydrateFallback`）组件可以立即渲染，取代路由组件的位置：

::: code-group

```tsx [routes/client-only-route.tsx]
export async function clientLoader() {
  const data = await fakeLoadLocalGameData();
  return data;
}

export function HydrateFallback() {
  return <p>Loading Game...</p>;
}

export default function Component({ loaderData }) {
  return <Game data={loaderData} />;
}
```

:::

## headers

路由头部（Route headers）用于定义在服务器端渲染时随响应一同发送的 HTTP 头部信息：

```tsx
export function headers() {
  return {
    "X-Stretchy-Pants": "its for fun",
    "Cache-Control": "max-age=300, s-maxage=3600",
  };
}
```

## handle

路由句柄（Route handle）允许应用程序向 `useMatches` 中的路由匹配结果添加任何内容，以创建抽象概念（比如面包屑导航等）：

```tsx
export const handle = {
  its: "all yours",
};
```

## links

路由链接（Route links）用于定义 `<link>` 元素，这些 `<link>` 元素将会在文档的 `<head>` 部分被渲染出来：

```tsx
export function links() {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    {
      rel: "stylesheet",
      href: "https://example.com/some/styles.css",
    },
    {
      rel: "preload",
      href: "/images/banner.jpg",
      as: "image",
    },
  ];
}
```

所有的路由链接（Route links）将会被汇总并通过 `<Links />` 组件进行渲染，通常该组件会在应用的根组件中被渲染：

::: code-group

```tsx [app/root.tsx]
import { Links } from "react-router";

export default function Root() {
  return (
    <html>
      <head>
        <Links />
      </head>

      <body />
    </html>
  );
}
```

:::

## meta

路由元数据（Route meta）用于定义那些将会在文档的 `<head>` 部分被渲染的元标签（meta tags）：

```tsx
export function meta() {
  return [
    { title: "Very cool app" },
    {
      property: "og:title",
      content: "Very cool app",
    },
    {
      name: "description",
      content: "This app is the best",
    },
  ];
}
```

所有路由的元数据（meta）将会被汇总并通过 `<Meta />` 组件进行渲染，通常该组件会在应用的根组件中被渲染：

::: code-group

```tsx [app/root.tsx]
import { Meta } from "react-router";

export default function Root() {
  return (
    <html>
      <head>
        <Meta />
      </head>

      <body />
    </html>
  );
}
```

:::

也可参考：

- [meta 参数](https://api.reactrouter.com/v7/interfaces/react_router.MetaArgs)

## shouldRevalidate

默认情况下，在执行操作（actions）之后，所有路由都会进行重新验证（revalidated）。而此功能允许某个路由选择不针对那些不会影响其自身数据的操作进行重新验证。

```tsx
import type { ShouldRevalidateFunctionArgs } from "react-router";

export function shouldRevalidate(arg: ShouldRevalidateFunctionArgs) {
  return true;
}
```
