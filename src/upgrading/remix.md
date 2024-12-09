# 从 Remix 升级

React Router 版本 7 是 Remix 在版本 2 之后的下一个主要版本（如需了解更多信息，请查看我们的[“迈向 React 19 的渐进式历程”](https://remix.run/blog/incremental-path-to-react-19)一文）。

如果你已经启用了所有 [Remix 版本 2 的未来特性](https://remix.run/docs/start/future-flags)标志，那么从 Remix 版本 2 升级到 React Router 版本 7 主要涉及更新依赖项。

> [!TIP] 提示：
> 步骤 2 到 8 中的大部分内容都可以使用社区成员 [James Restall](https://github.com/jrestall) 创建的[代码转换工具 codemod ](https://codemod.com/registry/remix-2-react-router-upgrade) 来自动更新。

## 1. 使用未来特性

👉 **使用未来特性**

在你的 Remix v2 应用程序中采用所有现有的[未来特性](https://remix.run/docs/start/future-flags)。

## 2. 更新依赖

大多数过去通过特定运行时软件包（如 `@remix-run/node`、`@remix-run/cloudflare` 等）重新导出的“共享”API，在版本 7 中都已整合进了 `react-router` 里。因此，你不用再从 `@react-router/node` 或 `@react-router/cloudflare` 中导入了，而是直接从 `react-router` 中导入它们。

```ts
import { redirect } from "@remix-run/node"; // [!code --]
import { redirect } from "react-router"; // [!code ++]
```

在版本 7 中，你唯一应该从特定运行时软件包中导入的 API，是那些特定于该运行时的 API，比如适用于 Node 的 `createFileSessionStorage` 以及适用于 Cloudflare 的 `createWorkersKVSessionStorage`。

👉 **运行代码转换工具（自动化操作）**

你可以使用以下[代码转换工具](https://codemod.com/registry/remix-2-react-router-upgrade)来自动更新你的软件包和导入语句。这个代码转换工具会更新你所有的软件包和导入内容。在运行该代码转换工具之前，务必提交所有未完成的更改，以防你后续需要进行回滚操作。 

```sh
npx codemod remix/2/react-router/upgrade
```

👉 **安装依赖**

```sh
npm install # or npm i
```

👉 **更新依赖（手动）**

如果你不喜欢使用 codemod，你可以手动更新你的依赖。

::: details 展开按字母顺序查看软件包名称变更的列表

| Remix v2 Package         |   |      React Router v7 Package      |
| :----------------------- |---:|      :--------------------------- |
| `@remix-run/architect`   | ➡️ |      `@react-router/architect`    |
| `@remix-run/cloudflare`  | ➡️ |     `@react-router/cloudflare`    |
| `@remix-run/dev`         | ➡️ |     `@react-router/dev`    |
| `@remix-run/express`     | ➡️ |     `@react-router/express`    |
| `@remix-run/fs-routes`   | ➡️ |     `@react-router/fs-routes`    |
| `@remix-run/node`        | ➡️ |     `@react-router/node`    |
| `@remix-run/react`       | ➡️ |     `react-router`    |
| `@remix-run/route-config`           | ➡️ |     `@react-router/dev`    |
| `@remix-run/routes-option-adapter`  | ➡️ |     `@react-router/remix-routes-option-adapter`    |
| `@remix-run/serve`       | ➡️ |     `@react-router/serve`    |
| `@remix-run/server-runtime`         | ➡️ |     `react-router`    |
| `@remix-run/testing`     | ➡️ |     `react-router`    |
:::