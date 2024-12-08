# 测试

当组件使用了诸如 `useLoaderData`、`<Link>` 等与 React Router 相关的特性时，有一个重要的要求，那就是这些组件必须在 React Router 应用的上下文环境中进行渲染。为了能够在隔离的情况下对这些组件进行测试，`createRoutesStub` 函数应运而生，它能够帮助创建相应的上下文。

当我们有一个登录表单组件依赖 `useActionData` 时：

```tsx
import { useActionData } from "react-router";

export function LoginForm() {
  const errors = useActionData();
  return (
    <Form method="post">
      <label>
        <input type="text" name="username" />
        {errors?.username && <div>{errors.username}</div>}
      </label>

      <label>
        <input type="password" name="password" />
        {errors?.password && <div>{errors.password}</div>}
      </label>

      <button type="submit">Login</button>
    </Form>
  );
}
```

`createRoutesStub` 函数在测试如上述依赖 useActionData 的登录表单组件这类与 React Router 紧密相关的组件时，发挥着重要作用。它接收一个对象数组作为参数，这些对象类似于包含 Loaders、 Actions 以及组件的路由模块。

```ts
import { createRoutesStub } from "react-router";
import * as Test from "@testing-library/react";
import { LoginForm } from "./LoginForm";

test("LoginForm renders error messages", async () => {
  const USER_MESSAGE = "Username is required";
  const PASSWORD_MESSAGE = "Password is required";

  const Stub = createRoutesStub([
    {
      path: "/login",
      Component: LoginForm,
      action() {
        return {
          errors: {
            username: USER_MESSAGE,
            password: PASSWORD_MESSAGE,
          },
        };
      },
    },
  ]);

  // 渲染 `/login` 路由模拟
  Test.render(<Stub initialEntries={["/login"]} />);

  // 模拟交互过程
  Test.user.click(screen.getByText("Login"));
  await Test.waitFor(() => screen.findByText(USER_MESSAGE));
  await Test.waitFor(() => screen.findByText(PASSWORD_MESSAGE));
});
```
