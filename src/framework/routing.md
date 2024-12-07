# 路由

## 配置路由

路由是在 `app/routes.ts` 文件中进行配置的。每条路由都包含两个必需的部分：一个用于匹配 URL 的 URL 模式，以及一个指向定义其行为的路由模块的文件路径。

::: code-group

```tsx [app/routes.ts]
import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("some/path", "./some/file.tsx"),
  //  匹配模式 ^           ^ 模块文件路径
] satisfies RouteConfig;
```

:::

以下是一个更复杂些的路由配置示例：

::: code-group

```ts [app/routes.ts]
import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./home.tsx"),
  route("about", "./about.tsx"),

  layout("./auth/layout.tsx", [
    route("login", "./auth/login.tsx"),
    route("register", "./auth/register.tsx"),
  ]),

  ...prefix("concerts", [
    index("./concerts/home.tsx"),
    route(":city", "./concerts/city.tsx"),
    route("trending", "./concerts/trending.tsx"),
  ]),
] satisfies RouteConfig;
```

:::

如果你更倾向于通过文件命名约定而非配置的方式来定义路由，那么 `@react-router/fs-routes` 包提供了一种基于[文件系统的路由约定](https://reactrouter.com/how-to/file-route-conventions)。

## 路由模块

在 `routes.ts` 文件中引用的文件定义了每条路由的行为。

::: code-group

```ts [routes.ts]
route("teams/:teamId", "./team.tsx"),
//                路由模块 ^^^^^^^^

```

:::

以下是一个简单的路由模块示例：

::: code-group

```tsx [app/team.tsx]
// 提供类型安全 / 类型推断
import type { Route } from "./+types/team";

// 向组件提供`加载器中的数据`
export async function loader({ params }: Route.LoaderArgs) {
  let team = await fetchTeam(params.teamId);
  return { name: team.name };
}

// 在加载器完成后渲染组件
export default function Component({ loaderData }: Route.ComponentProps) {
  return <h1>{loaderData.name}</h1>;
}
```

:::

路由模块具备更多功能，比如操作（actions）、头部信息（headers）以及错误边界（error boundaries）等，但这些内容将会在下一篇指南: [路由模块](./route-module)中进行介绍。

## 嵌套路由

它允许路由被嵌套在父路由内部。

::: code-group

```ts [app/routes.ts]
import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  // 父路由
  route("dashboard", "./dashboard.tsx", [
    // 子路由
    index("./home.tsx"),
    route("settings", "./settings.tsx"),
  ]),
] satisfies RouteConfig;
```

:::

父路由的路径会自动包含在子路由中，所以以上配置会同时创建出 `“/dashboard”` 和 `“/dashboard/settings”` 两个 URL 路由。

子路由是通过父路由中的 `<Outlet/>` 组件来进行渲染的。

::: code-group

```tsx [app/dashboard.tsx]
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* 将会是 home.tsx 或者 settings.tsx */}
      <Outlet />
    </div>
  );
}
```

:::

## 根路由

在 `routes.ts` 文件中的每条路由都嵌套在特殊的 `app/root.tsx` 模块内部。

## 布局路由

`layout` 是一种在路由体系中有着独特作用的路由类型。它能够为其子路由创建新的嵌套层级，不过值得注意的是，它并不会给 URL 添加额外的路径片段。可以把它类比为根路由，根路由构建了整个应用最基础的页面布局框架，而布局路由同样是起着构建页面布局框架的作用，只是它可以在任意层级被添加，从而灵活地塑造应用内不同部分的页面层级结构和布局样式。

::: code-group

```ts {10,16} [app/routes.ts]
import {
  type RouteConfig,
  route,
  layout,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("./marketing/layout.tsx", [
    index("./marketing/home.tsx"),
    route("contact", "./marketing/contact.tsx"),
  ]),
  ...prefix("projects", [
    index("./projects/home.tsx"),
    layout("./projects/project-layout.tsx", [
      route(":pid", "./projects/project.tsx"),
      route(":pid/edit", "./projects/edit-project.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
```

:::

## 索引路由

索引路由是路由体系中一种比较特殊且实用的路由类型。它主要用于在某个父路由下，当用户访问父路由对应的 URL 且没有指定具体的子路由路径时，来确定默认展示的页面内容。简单来说，就是为父路由所代表的页面层级设定一个默认的 “首页” 或者说 “主页面”。

```ts
index(componentFile),
```

索引路由有着特定的渲染方式，它会在其父路由对应的 URL 下，渲染到父路由的 [Outlet](https://reactrouter.com/api/react-router/Outlet) 组件中，就如同是父路由的默认子路由一样。

::: code-group

```ts [app/routes.ts]
import { type RouteConfig, route, index } from "@react-router/dev/routes";

export default [
  // 渲染到根路由 root.tsx Outlet 内
  index("./home.tsx"),
  route("dashboard", "./dashboard.tsx", [
    // 在 /dashboard 路由下, 渲染到 dashboard.tsx Outlet 组件内
    index("./dashboard-home.tsx"),
    route("settings", "./dashboard-settings.tsx"),
  ]),
] satisfies RouteConfig;
```

:::

> [!TIP] 提示
> 索引路由没有子路由

## 路由前缀

路由前缀是一种在路由配置中很实用的特性。通过使用 `prefix`，开发者能够为一组路由添加一个公共的路径前缀，而且关键的是，无需特意去引入一个父路由文件来实现这一效果。

::: code-group

```ts {14} [app/routes.ts]
import {
  type RouteConfig,
  route,
  layout,
  index,
  prefix,
} from "@react-router/dev/routes";

export default [
  layout("./marketing/layout.tsx", [
    index("./marketing/home.tsx"),
    route("contact", "./marketing/contact.tsx"),
  ]),
  ...prefix("projects", [
    index("./projects/home.tsx"),
    layout("./projects/project-layout.tsx", [
      route(":pid", "./projects/project.tsx"),
      route(":pid/edit", "./projects/edit-project.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
```

:::

## 动态路由匹配

很多时候，我们需要将给定匹配模式的路由映射到同一个组件。我们可以在路径中使用一个动态字段来实现，我们称之为 路径参数。路径参数将会从匹配的 URL 中解析，并作为 `params` 提供给其他路由接口。

::: code-group

```ts [app/routes.ts]
route("teams/:teamId", "./team.tsx"),
```

:::

::: code-group

```ts [app/team.tsx]
import type { Route } from "./+types/team";

export async function loader({ params }: Route.LoaderArgs) {
  //                           ^? { teamId: string }
}

export default function Component({ params }: Route.ComponentProps) {
  params.teamId;
  //        ^ string
}
```

:::

## 可选参数

你可以在路由参数后面添加 `?`，使其成为可选的路由参数。

::: code-group

```ts [app/routes.ts]
route(":lang?/categories", "./categories.tsx"),
```

:::

你甚至可以设置可选的静态路由参数，具体如下：

::: code-group

```ts [app/routes.ts]
route("users/:userId/edit?", "./user.tsx");
```

:::

## 通配符

通配符片段也被称作 `“catchall”` 以及 `“star”` 匹配。当一个路由路径模式以 `/*` 结尾时，它就具备了通配符的特性。其原理在于，这样的路由路径能够匹 `/` 之后的任意字符，这里的任意字符包含了其他的 `/` 字符也没问题。

::: code-group

```ts [app/routes.ts]
route("files/*", "./files.tsx"),
```

:::

::: code-group

```tsx [app/files.tsx]
export async function loader({ params }: Route.LoaderArgs) {
  // params["*"] 将会包含在 files/ 之后剩余的 URL 内容。
}
```

:::

你甚至可以对 `*` 进行解构，只是需要给它赋一个新的名字。习惯命名为 `splat`。

```ts
const { "*": splat } = params;
```

## 组件路由

你也可以使用与 URL 相匹配的组件，并将它们映射到组件树中的任意元素位置:

```tsx
import { Routes, Route } from "react-router";

function Wizard() {
  return (
    <div>
      <h1>Some Wizard with Steps</h1>
      <Routes>
        <Route index element={<StepOne />} />
        <Route path="step-2" element={<StepTwo />} />
        <Route path="step-3" element={<StepThree />}>
      </Routes>
    </div>
  );
}
```

需要注意的是，这些路由并不参与数据加载、操作（actions）、代码分割，也不具备其他路由模块所拥有的功能特性，所以相较于路由模块而言，它们的应用场景更为有限。
