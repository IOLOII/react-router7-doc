# Actions

数据变更通过路由动作（Route actions）来完成。当路由动作执行完毕后，页面上所有由加载器获取的数据都会被重新验证（revalidated），这样就能在无需编写额外代码的情况下，确保用户界面与数据保持同步。

通过 `action` 定义的路由动作只会在服务器端被调用，而通过 `clientAction` 定义的路由动作则是在浏览器（也就是客户端）中运行。

## 客户端 Actions

`clientAction` 仅在浏览器端运行，并且当同时定义了 action 和 clientAction 时，clientAction 会优先被执行。

::: code-group

```tsx [app/project.tsx]
// route('/projects/:projectId', './project.tsx')
import type { Route } from "./+types/project";
import { Form } from "react-router";
import { someApi } from "./api";

export async function clientAction({ request }: Route.ClientActionArgs) {
  let formData = await request.formData();
  let title = await formData.get("title");
  let project = await someApi.updateProject({ title });
  return project;
}

export default function Project({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Project</h1>
      <Form method="post">
        <input type="text" name="title" />
        <button type="submit">Submit</button>
      </Form>
      {actionData ? <p>{actionData.title} updated</p> : null}
    </div>
  );
}
```

:::

## 服务端 Actions

`action` 仅在服务器端运行，并且会从客户端的打包代码包中被移除。

::: code-group

```tsx [app/project.tsx]
// route('/projects/:projectId', './project.tsx')
import type { Route } from "./+types/project";
import { Form } from "react-router";
import { fakeDb } from "../db";

export async function action({ request }: Route.ActionArgs) {
  let formData = await request.formData();
  let title = await formData.get("title");
  let project = await fakeDb.updateProject({ title });
  return project;
}

export default function Project({ actionData }: Route.ComponentProps) {
  return (
    <div>
      <h1>Project</h1>
      <Form method="post">
        <input type="text" name="title" />
        <button type="submit">Submit</button>
      </Form>
      {actionData ? <p>{actionData.title} updated</p> : null}
    </div>
  );
}
```

:::

## 调用 Actions 的方式

Actions 可以通过声明式 `<Form>` 组件和钩子函数 `useSubmit`（或者使用 `<fetcher.Form>` 和 `fetcher.submit`）被调用，使用时传递一个路由 path 和一个 “post” 方法：

### 使用 Form 调用

```tsx
import { Form } from "react-router";

function SomeComponent() {
  return (
    <Form action="/projects/123" method="post">
      <input type="text" name="title" />
      <button type="submit">Submit</button>
    </Form>
  );
}
```

这种方式会造成一次浏览器导航，并且会在浏览器的历史记录中添加一个新的记录。

### 使用 useSubmit 调用

你可以通过使用 `useSubmit` 钩子函数来调用 action：

```ts
import { useCallback } from "react";
import { useSubmit } from "react-router";
import { useFakeTimer } from "fake-lib";

function useQuizTimer() {
  let submit = useSubmit();

  let cb = useCallback(() => {
    submit({ quizTimedOut: true }, { action: "/end-quiz", method: "post" });
  }, []);

  let tenMinutes = 10 * 60 * 1000;
  useFakeTimer(tenMinutes, cb);
}
```

同样，这种方式也会造成一次浏览器导航，并且会在浏览器的历史记录中添加一个新的记录。

### 使用 fetcher 调用

Fetchers 能够让你向 Actions 以及 Loaders 提交数据，同时不会引发导航行为，也就是说不会在浏览器历史记录中添加新的记录。

```tsx
import { useFetcher } from "react-router";

function Task() {
  let fetcher = useFetcher();
  let busy = fetcher.state !== "idle";

  return (
    <fetcher.Form method="post" action="/update-task/123">
      <input type="text" name="title" />
      <button type="submit">{busy ? "Saving..." : "Save"}</button>
    </fetcher.Form>
  );
}
```

它也有一个编程式 `submit` 方法：

```ts
fetcher.submit(
  { title: "New Title" },
  { action: "/update-task/123", method: "post" }
);
```

阅读 [使用 Fetchers](../how-tos/fetchers.md) 以了解更多关于 Fetchers 的信息。
