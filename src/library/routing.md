# 路由

## 配置路由

路由是通过渲染 `<Routes>` 和 `<Route>` 组件来进行配置的，它将 path 和 对应组件关联了起来。

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./app";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
);
```

下面是稍微复杂一点的例子：

```tsx
<Routes>
  <Route index element={<Home />} />
  <Route path="about" element={<About />} />

  <Route element={<AuthLayout />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
  </Route>

  <Route path="concerts">
    <Route index element={<ConcertsHome />} />
    <Route path=":city" element={<City />} />
    <Route path="trending" element={<Trending />} />
  </Route>
</Routes>
```

## 嵌套路由

路由可以被嵌套在父路由中。

```tsx
<Routes>
  <Route path="dashboard" element={<Dashboard />}>
    <Route index element={<Home />} />
    <Route path="settings" element={<Settings />} />
  </Route>
</Routes>
```

父路由的 path 会自动添加到子路由的 path 中，所以上面的例子中，会创建两个路由 `"/dashboard"` 和 `"/dashboard/settings"`。

子路由通过父路由组件中的 `<Outlet/>` 渲染。

::: code-group

```tsx [app/dashboard.tsx]
import { Outlet } from "react-router";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      {/* 将被渲染成 <Home/> 或 <Settings/> */}
      <Outlet />
    </div>
  );
}
```

:::

## 布局路由

没有 path 的路由看起来会有一定的嵌套关系，但不会在路由上添加额外的路径。

```tsx{2,9}
<Routes>
  <Route element={<MarketingLayout />}>
    <Route index element={<MarketingHome />} />
    <Route path="contact" element={<Contact />} />
  </Route>

  <Route path="projects">
    <Route index element={<ProjectsHome />} />
    <Route element={<ProjectsLayout />}>
      <Route path=":pid" element={<Project />} />
      <Route path=":pid/edit" element={<EditProject />} />
    </Route>
  </Route>
</Routes>

```

## 索引路由

索引路由会在其父路由组件对应的 `<Outlet/>` 中进行渲染（就像是默认的子路由一样）。它们通过 `index` 属性来进行配置。

```tsx{4,8}
<Routes>
  <Route path="/" element={<Root />}>
    {/* 访问 “/” 会被渲染到 Outlet 里 */}
    <Route index element={<Home />} />

    <Route path="dashboard" element={<Dashboard />}>
      {/* 访问 "/dashboard" 会被渲染到 Outlet 里  */}
      <Route index element={<DashboardHome />} />
      <Route path="settings" element={<Settings />} />
    </Route>
  </Route>
</Routes>

```

请注意，索引路由不能有子路由。如果你期望实现有子路由这种行为，那你可能需要一个[布局路由](#布局路由)。

## 路由前缀

一个不带 `element` 属性的 `<Route path>` 会为其子路由添加路径前缀，无须引入父布局。

```tsx{1}
<Route path="projects">
  <Route index element={<ProjectsHome />} />
  <Route element={<ProjectsLayout />}>
    <Route path=":pid" element={<Project />} />
    <Route path=":pid/edit" element={<EditProject />} />
  </Route>
</Route>

```

## 动态传参

如果路由的 path 包含 `:`，那么它会被视为动态参数，当路由被匹配时，动态参数将被解析并提供给其他路由 API 接口，比如 `useParams` 。

```tsx
<Route path="teams/:teamId" element={<Team />} />
```

::: code-group

```tsx [app/team.tsx]
import { useParams } from "react-router";

export default function Team() {
  let params = useParams();
  // params.teamId
}
```

:::

在一个路由中可以有多个动态参数：

```tsx
<Route path="/c/:categoryId/p/:productId" element={<Product />} />
```

## 可选参数

在动态参数后面添加 `?` 可以使其变为可选参数。

```tsx
<Route path=":lang?/categories" element={<Categories />} />
```

也可以在静态字符串后面加上 `?`，使其变为可选参数：

```tsx
<Route path="users/:userId/edit?" component={<User />} />
```

## 通配符

也被称为 `“捕获所有”` 和 `*` 路由，如果一个路由模式以 `/*` 结尾，后面的任意字符串都会匹配到，也包括其他的 `/`。

```tsx
<Route path="files/*" element={<File />} />
```

```ts
let params = useParams();
// `params["*"]` 将包含 `files/` 之后剩余的URL内容。
let filePath = params["*"];
```

你可以对 `*` 进行解构，只是必须给它赋一个新的名称。一般命名为 `splat` 。

```ts
let { "*": splat } = useParams();
```

## 导航

使用 `<Link>` 和 `<NavLink>` 进行路由之间的跳转。

```tsx
import { NavLink, Link } from "react-router";

function Header() {
  return (
    <nav>
      {/* NavLink 可以很方便的展示激活状态样式 */}
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>

      <Link to="/concerts/salt-lake-city">Concerts</Link>
    </nav>
  );
}
```
