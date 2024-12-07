# 导航

用户可以通过 `<Link>`、`<NavLink>`、`<Form>`、`redirect` 以及 `useNavigate` 这些方式来在你的应用中进行导航。

## NavLink

如果你需要一个激活状态或者加载状态，使用 `NavLink` 导航组件很合适。

```tsx
import { NavLink } from "react-router";

export function MyAppNav() {
  return (
    <nav>
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/trending" end>
        Trending Concerts
      </NavLink>
      <NavLink to="/concerts">All Concerts</NavLink>
      <NavLink to="/account">Account</NavLink>
    </nav>
  );
}
```

`<NavLink>` 组件会为不同的状态渲染默认的类名，这一特性方便了你使用 CSS 来对其进行样式设置：

```css
a.active {
  color: red;
}

a.pending {
  animate: pulse 1s infinite;
}

a.transitioning {
  /* 运行中的css动画 */
}
```

不仅如此，它还具备 `className`、`style` 和 `children` 这几个带有状态信息的回调属性，可用于内联样式（inline styling）或有条件的渲染：

```tsx
// className
<NavLink
  to="/messages"
  className={({ isActive, isPending, isTransitioning }) =>
    [
      isPending ? "pending" : "",
      isActive ? "active" : "",
      isTransitioning ? "transitioning" : "",
    ].join(" ")
  }
>
  Messages
</NavLink>
```

```tsx
// style
<NavLink
  to="/messages"
  style={({ isActive, isPending, isTransitioning }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
    };
  }}
>
  Messages
</NavLink>
```

```tsx
// children
<NavLink to="/tasks">
  {({ isActive, isPending, isTransitioning }) => (
    <span className={isActive ? "active" : ""}>Tasks</span>
  )}
</NavLink>
```

## Link

当跳转链接不需要激活样式时，使用 `<Link>`：

```tsx
import { Link } from "react-router";

export function LoggedOutMessage() {
  return (
    <p>
      你已经退出. <Link to="/login">再次登录</Link>
    </p>
  );
}
```

## Form

`<Form>` 组件通过用户提供的 `URLSearchParams` 来进行导航：

```tsx
<Form action="/search">
  <input type="text" name="q" />
</Form>
```

如果你在输入框输入 `"journey"` 并提交，那么会导航到：

```js
/search?q=journey
```

带有 `<Form method="post">` 的表单会被导航到 action 属性所指定的路由路径对应的页面。此时提交的数据会以 `FormData` 的形式进行发送，而不是像使用 `URLSearchParams` 那样（前面介绍过 URLSearchParams 主要用于构建 URL 查询参数并在 get 方法等场景下传递数据）。然而，更推荐使用 `useFetcher()` 提交表单数据，详细说明可以参考 [使用 Fetcher](../how-tos/fetchers.md)。

## redirect

你可以在路由 loaders 和 actions 中使用 `redirect` 函数来进行重定向：

```tsx
import { redirect } from "react-router";

export async function loader({ request }) {
  let user = await getUser(request);
  if (!user) {
    return redirect("/login");
  }
  return { userName: user.name };
}
```

常见做法是，重定向到一个新的浏览器记录：

```tsx
import { redirect } from "react-router";

export async function action({ request }) {
  let formData = await request.formData();
  let project = await createProject(formData);
  return redirect(`/projects/${project.id}`);
}
```

## useNavigate

这个钩子（hook）允许代码在无需用户交互的情况下将用户导航到新的页面。不过，其使用场景相对来说并不常见，并且在有可能的情况下，推荐优先使用本指南中介绍的其他方式来实现相关功能。

虽然前面提到在有其他更符合常规交互模式时，应优先选用它们来实现页面导航，但 `useNavigate` 钩子函数在某些特定的、用户没有主动交互但又确实需要进行导航的情况下，有着合理且必要的应用场景，比如：

- 用户长时间无操作后自动登出
- 限时交互的用户界面等

```ts
import { useNavigate } from "react-router";

export function useLogoutAfterInactivity() {
  let navigate = useNavigate();

  useFakeInactivityHook(() => {
    navigate("/logout");
  });
}
```
