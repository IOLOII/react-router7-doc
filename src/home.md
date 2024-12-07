# React Router 主页

React Router 是一款适用于 React 的多策略路由器，它让你从 React 18 到 React 19 平滑升级。你既可以将它最大限度地作为一个 React 框架来使用，也可以在自己的架构中把它当作一个库来最低限度地使用。

- [快速开始 - 框架](/framework/installation)
- [快速开始 - 库](/library/installation)

如果你了解未来特性（flags）相关内容，从 React Router v6 或者 Remix 进行升级通常是不会造成破坏的。

- [从 v6 升级]()
- [从 Remix 升级]()

## React Router 做为库使用

与以往版本一样，React Router 仍然可以当作一个简单的、声明式的路由库来使用。它唯一的任务就是将 URL 与一组组件进行匹配，提供对 URL 数据的访问途径，并实现在应用内进行导航。

这种使用策略在那些拥有自身前端基础设施的 “单页应用”（Single Page Apps）以及寻求轻松升级的 React Router v6 应用中很受欢迎。

它尤其适用于离线 + 同步架构，在这类架构中，待处理状态（pending states）很少出现，而且用户会有长时间持续的会话。像待处理状态、代码拆分、服务器端渲染、搜索引擎优化（SEO）以及初始页面加载时间等框架特性，都可以被舍弃，以换取即时的、本地优先的交互体验。

```tsx
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<RecentActivity />} />
        <Route path="project/:id" element={<Project />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
```

[快速开始]()，作为库来使用。

## React Router 做为框架使用

React Router 可最大限度地被用作你的 React 框架。在这种设置下，你将使用 React Router 命令行界面（CLI）以及 Vite 打包器插件来构建一个全栈开发与部署架构。这使得 React Router 能够提供大多数 Web 项目都会需要的大量功能，这些功能包括：

- Vite 打包与开发服务器集成
- 热模块替换
- 代码拆分
- 具有类型安全的路由规范
- 基于文件系统或配置的路由
- 具有类型安全的数据加载
- 具有类型安全的 actions
- Actions 执行后页面数据的自动重新验证
- SSR（服务器端渲染）、SPA（单页应用）和静态渲染策略
- 用于加载状态和及时页面更新的 API
- 部署适配器

路由是通过 `routes.ts` 文件进行配置的，这使得 React Router 能够为你完成诸多工作。例如，它会自动对每条路由进行代码拆分，为传参和数据提供类型安全保障，当用户导航到当前路由时自动数据加载与待处理状态等。

```ts
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
    route(":city/:id", "./concerts/show.tsx")
    route("trending", "./concerts/trending.tsx"),
  ]),
] satisfies RouteConfig;
```

你将能够使用路由模块接口（Route Module API），其他的大多数功能都是基于此构建的。

加载器（Loaders）为路由组件提供数据：

```ts
// loaders provide data to components
export async function loader({ params }: Route.LoaderArgs) {
  const [show, isLiked] = await Promise.all([
    fakeDb.find("show", params.id),
    fakeIsLiked(params.city),
  ]);
  return { show, isLiked };
}
```

组件会依据在 routes.ts 文件中配置好的 URL 进行渲染，并且加载器获取的数据会作为属性（prop）传入组件当中。

```tsx
export default function Show({ loaderData }: Route.ComponentProps) {
  const { show, isLiked } = loaderData;
  return (
    <div>
      <h1>{show.name}</h1>
      <p>{show.description}</p>

      <form method="post">
        <button type="submit" name="liked" value={isLiked ? 0 : 1}>
          {isLiked ? "Remove" : "Save"}
        </button>
      </form>
    </div>
  );
}
```

操作（Actions）能够更新数据，并且触发对页面上所有数据的重新验证，这样一来，你的用户界面（UI）就能自动保持最新状态。

```ts
export async function action({ request, params }: Route.LoaderArgs) {
  const formData = await request.formData();
  await fakeSetLikedShow(formData.get("liked"));
  return { ok: true };
}
```

路由模块还为搜索引擎优化（SEO）、资源加载、错误边界以及更多方面提供了规范。

[快速开始]()，作为框架来使用。
