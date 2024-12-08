# 导航

使用 `<Link>`、`<NavLink>` 和 `useNavigate` 来进行导航。

## NavLink

该组件适用于那些需要渲染激活状态的导航链接。

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

当 `<NavLink>` 处于激活状态时，它会自动拥有一个 `.active` 类名，以便于使用 CSS 轻松设置样式：

```css
a.active {
  color: red;
}
```

它还在 `className`（类名）、`style`（样式）以及 `children`（子元素）上有回调属性，这些回调属性带有活动状态，可用于内联样式设置或条件渲染。

```tsx
// className
<NavLink
  to="/messages"
  className={({ isActive }) => (isActive ? "text-red-500" : "text-black")}
>
  Messages
</NavLink>
```

```tsx
// style
<NavLink
  to="/messages"
  style={({ isActive }) => ({
    color: isActive ? "red" : "black",
  })}
>
  Messages
</NavLink>
```

```tsx
// children
<NavLink to="/message">
  {({ isActive }) => (
    <span className={isActive ? "active" : ""}>
      {isActive ? "👉" : ""} Tasks
    </span>
  )}
</NavLink>
```

## Link

不需要激活样式时，可以使用 `<Link>` 组件。

```tsx
import { Link } from "react-router";

export function LoggedOutMessage() {
  return (
    <p>
      您已退出. <Link to="/login">再次登录</Link>
    </p>
  );
}
```

## useNavigate

这个钩子（hook）允许程序在无需用户交互的情况下将用户导航至新页面。

对于常规导航而言，最好使用 `<Link>` 或 `<NavLink>`。它们能提供更好的默认用户体验，比如键盘事件、无障碍标签、“在新窗口中打开”、右键上下文菜单等等。

如果用户长时间停留在页面上，并且你希望他们能够导航到其他页面，那么 `useNavigate` 是一个不错的选择。例如：

- 表单提交完成之后
- 用户长时间没有操作退出系统
- 有时间限制的游戏界面等等场景

```tsx
import { useNavigate } from "react-router";

export function LoginPage() {
  let navigate = useNavigate();

  return (
    <>
      <MyHeader />
      <MyLoginForm
        onSuccess={() => {
          navigate("/dashboard");
        }}
      />
      <MyFooter />
    </>
  );
}
```
