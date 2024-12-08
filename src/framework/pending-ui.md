# 待处理的 UI

当用户导航到新路由，或者向 Actions 提交数据这类操作时，用户界面（UI）应当立即呈现一种 loading 状态或者响应状态，这是在代码逻辑中要干的事情。

## 全局 loading

当用户在 Web 应用中导航到一个新的 URL 时，会涉及到页面加载器（loaders）以及页面渲染之间的协调关系，并且可以通过 `useNavigation` 这个钩子函数来获取到 loading 状态：

```tsx
import { useNavigation } from "react-router";

export default function Root() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  return (
    <html>
      <body>
        {isNavigating && <GlobalSpinner />}
        <Outlet />
      </body>
    </html>
  );
}
```

## 局部 loading

在 Web 应用开发中，不仅可以在页面整体层面展示 loading 指示器来提示用户操作正在进行中，还能够将这类指示器本地化到具体的链接上，而 `<NavLink>` 组件的 children、className 和 style 属性在此过程中发挥了重要作用，它们可以接收 loading 状态作为参数的函数形式来实现相应的本地化效果：

```tsx
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav>
      <NavLink to="/home">
        {({ isPending }) => <span>Home {isPending && <Spinner />}</span>}
      </NavLink>
      <NavLink
        to="/about"
        style={({ isPending }) => ({
          color: isPending ? "gray" : "black",
        })}
      >
        About
      </NavLink>
    </nav>
  );
}
```

## Form 提交 loading

当用户在 Web 应用中提交表单时，用户界面（UI）应当立即通过呈现 loading 状态来对用户的这一操作行为做出响应，告知用户表单提交操作正在进行中。在实现这一功能时，使用 [fetcher](https://api.reactrouter.com/v7/functions/react_router.useFetcher.html) 表单相对更为便捷，这是因为它具备自身独立的状态。（而常规的表单提交往往会引发全局导航）。

::: code-group

```tsx{10} [app/project.tsx]
import { useFetcher } from "react-router";

function NewProjectForm() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post">
      <input type="text" name="title" />
      <button type="submit">
        {fetcher.state !== "idle" ? "Submitting..." : "Submit"}
      </button>
    </fetcher.Form>
  );
}
```

:::

非 `fetcher` 表单提交的场景下，使用 `useNavigation` 处理 loading 状态。

::: code-group

```tsx{4,10} [app/project/new.tsx]
import { useNavigation, Form } from "react-router";

function NewProjectForm() {
  const navigation = useNavigation();

  return (
    <Form method="post" action="/projects/new">
      <input type="text" name="title" />
      <button type="submit">
        {navigation.formAction === "/projects/new"
          ? "Submitting..."
          : "Submit"}
      </button>
    </Form>
  );
}
```

:::

## 乐观 UI

当通过表单提交数据能够知晓用户界面（UI）的未来状态时，便可以实现乐观（Optimistic）UI，从而为用户带来即时的用户体验（UX）提升：

::: code-group

```tsx{4-7} [app/project.tsx]
function Task({ task }) {
  const fetcher = useFetcher();

  let isComplete = task.status === "complete";
  if (fetcher.formData) {
    isComplete = fetcher.formData.get("status");
  }

  return (
    <div>
      <div>{task.title}</div>
      <fetcher.Form method="post">
        <button
          name="status"
          value={isComplete ? "incomplete" : "complete"}
        >
          {isComplete ? "Mark Incomplete" : "Mark Complete"}
        </button>
      </fetcher.Form>
    </div>
  );
}

```

:::
