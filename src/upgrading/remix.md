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

## 3. 更改 `package.json` 文件中的脚本

::: tip 提示：
如果你使用的是 codemod，就可以跳过这一步，因为这一步已被自动完成了。
:::

👉 **更新 `package.json` 中的脚本**

| Script | Remix v2         |   |      React Router v7      |
| :------|---------------- | ---: |  :--------------------------- |
| `dev` | `remix vite:dev` | ➡️ |      `react-router dev`    |
| `build` | `remix vite:build` | ➡️ |  `react-router build`    |
| `start` | `remix-serve build/server/index.js` | ➡️ |      `react-router-serve build/server/index.js`    |
| `typecheck` | `tsc` | ➡️ |      `react-router typegen && tsc`    |

## 4. 新建 `routes.ts` 文件

::: tip 提示：
如果你使用了代码转换工具并且启用了 Remix v2 的 v3_routeConfig 标志，就可以跳过这一步，因为这一步已经被自动完成了。
:::

在 React Router 版本 7 中，你可以使用 `app/routes.ts` 文件来定义路由。查看[路由相关文档](../framework/routing)以获取更多信息。

👉 **更新依赖项（如果使用了 Remix v2 的 v3_routeConfig 特性）**

```ts
// app/routes.ts
import { type RouteConfig } from "@remix-run/route-config"; // [!code --]
import { flatRoutes } from "@remix-run/fs-routes"; // [!code --]
import { remixRoutesOptionAdapter } from "@remix-run/routes-option-adapter"; // [!code --]
import { type RouteConfig } from "@react-router/dev/routes"; // [!code ++]
import { flatRoutes } from "@react-router/fs-routes"; // [!code ++]
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter"; // [!code ++]

export default [
  // 无论你的路由是如何定义的
] satisfies RouteConfig;
```

👉 **新建一个 `routes.ts` 文件（如果没有使用 Remix v2 的 v3_routeConfig 特性）**

```sh
touch app/routes.ts
```

为了实现向后兼容，也为了照顾那些更喜欢基于[文件的约定](../how-tos/file-route-conventions)的用户，你可以通过新的 `@react-router/fs-routes` 软件包，选择使用与在Remix v2中相同的“扁平路由”约定。 

::: code-group
```ts [app/routes.ts]
import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes() satisfies RouteConfig;
```
:::

或者，如果你之前是使用 `routes` 选项来定义基于配置的路由的话：

::: code-group
```ts [app/routes.ts]
import { type RouteConfig } from "@react-router/dev/routes";
import { remixRoutesOptionAdapter } from "@react-router/remix-routes-option-adapter";

export default remixRoutesOptionAdapter((defineRoutes) => {
  return defineRoutes((route) => {
    route("/", "home/route.tsx", { index: true });
    route("about", "about/route.tsx");
    route("", "concerts/layout.tsx", () => {
      route("trending", "concerts/trending.tsx");
      route(":city", "concerts/city.tsx");
    });
  });
}) satisfies RouteConfig;
```
:::

如果你之前在 `vite.config.ts` 文件中使用了 `routes` 选项，务必要将其移除。

```ts
export default defineConfig({
  plugins: [
    remix({
      ssr: true,
      ignoredRouteFiles: ['**/*'], // [!code --]
      routes(defineRoutes) {  // [!code --]
        return defineRoutes((route) => { // [!code --]
          route("/somewhere/cool/*", "catchall.tsx"); // [!code --]
        }); // [!code --]
      },  // [!code --]
    })
    tsconfigPaths(),
  ],
});
```

## 5. 新建 React Router 配置文件

👉 **在你项目中新增 `react-router.config.ts` 文件**

之前传递给 `vite.config.ts` 文件中 Remix 插件的配置，现在从 `react-router.config.ts` 文件中导出了。

注意：此时，你应该移除在步骤 1 中添加的 v3 未来特性标志。

```sh
touch react-router.config.ts
```

```ts
// vite.config.ts
export default defineConfig({
  plugins: [
    remix({ // [!code --]
      ssr: true, // [!code --]
      future: {/* 所有 v3 特性 */} // [!code --]
    }), // [!code --]
    remix(), // [!code ++]
    tsconfigPaths(),
  ],
});

// react-router.config.ts
import type { Config } from "@react-router/dev/config"; // [!code ++]
export default { // [!code ++]
  ssr: true, // [!code ++]
} satisfies Config; // [!code ++]
```

## 6. 在 `vite.config` 添加 Router 插件

::: tip 提示：
如果你使用了代码转换工具，就可以跳过这一步，因为这一步已经被自动完成了。
:::

👉 **添加 `reactRouter` 插件到 `vite.config`**

更改 `vite.config.ts` 文件，以便从 `@react-router/dev/vite` 导入并使用新的 `reactRouter` 插件。

```ts
import { vitePlugin as remix } from "@remix-run/dev"; // [!code --]
import { reactRouter } from "@react-router/dev/vite"; // [!code ++]
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix(), // [!code --]
    reactRouter(), // [!code ++]
    tsconfigPaths(),
  ],
});
```

## 7. 开启类型安全

::: tip 提示：
如果你没使用 TypeScript，可以跳过这一步。
:::

React Router 会自动在你的应用程序根目录下的 `.react-router/` 目录中为你的路由模块生成类型。该目录完全由 React Router 管理，应当被添加到 `.gitignore` 文件中（即让 Git 忽略它）。了解更多关于新的[类型安全特性](../explanations/type-safety)的内容。

👉 **添加 `.react-router/` 到 `.gitignore`**

```
.react-router/
```

👉 **更新 `tsconfig.json`**

更新你的 tsconfig.json 文件中的 types 字段，使其包含以下内容：

- 在 `include` 字段中添加 `.react-router/types/**/*` 路径
- 在 `types` 字段中添加相应的 `@react-router/*` 软件包
- 添加 `rootDirs` 以简化相对导入

```json
{
  "include": [
    /* ... */
    ".react-router/types/**/*" // [!code ++]
  ],
  "compilerOptions": {
    "types": ["@remix-run/node", "vite/client"], // [!code --]
    "types": ["@react-router/node", "vite/client"], // [!code ++]
    /* ... */
    "rootDirs": [".", "./.react-router/types"] // [!code ++]
  }
}
```

## 8. 重命名入口文件中的组件

::: tip 提示：
如果你使用的是 codemod，就可以跳过这一步，因为这一步已被自动完成了。
:::

如果你的应用程序中有 `entry.server.tsx` 和/或 `entry.client.tsx` 文件，那么你将需要更新这些文件中的主要组件。

::: code-group
```tsx [app/entry.server.tsx]
import { RemixServer } from "@remix-run/react"; // [!code --]
import { ServerRouter } from "react-router"; // [!code ++]

<RemixServer context={remixContext} url={request.url} />, // [!code --]
<ServerRouter context={remixContext} url={request.url} />,  // [!code ++]
```
:::

::: code-group
```tsx [app/entry.client.tsx]
import { RemixBrowser } from "@remix-run/react"; // [!code --]
import { HydratedRouter } from "react-router/dom"; // [!code ++]

hydrateRoot(
  document,
  <StrictMode>
    <RemixBrowser /> // [!code --]
    <HydratedRouter />  // [!code ++]
  </StrictMode>,
);
```
:::

## 9. 更新 `AppLoadContext` 的类型

::: tip 提示：
如果你之前使用的是 `remix-serve`，那么可以跳过这一步。只有当你在 Remix v2 中使用自定义服务器时，这一步才适用。 
:::

由于 React Router 既可以用作 React 框架，也可以用作独立的路由库，所以 `LoaderFunctionArgs`（加载器函数参数）和 `ActionFunctionArgs`（操作函数参数）中的 `context` 参数现在是可选的，并且默认情况下其类型为 `any`。你可以为你的加载上下文注册类型，以便为你的加载器和操作获取类型安全保障。 

👉 **给你的加载上下文注册类型**

在迁移到新的 `Route.LoaderArgs` 和 `Route.ActionArgs` 类型之前，你可以暂时使用你的加载上下文类型来扩充 `LoaderFunctionArgs` 和 `ActionFunctionArgs`，以便更轻松地进行迁移。

::: code-group
```ts [app/env.ts]
declare module "react-router" {
  // 你在v2版本中使用的 `AppLoadContext`
  interface AppLoadContext {
    whatever: string;
  }

  // TODO: 一旦我们已将加载器迁移到使用 Route.LoaderArgs，就移除这个
  interface LoaderFunctionArgs {
    context: AppLoadContext;
  }

  // TODO: 一旦我们已将操作迁移为使用 `Route.ActionArgs`，就移除这个
  interface ActionFunctionArgs {
    context: AppLoadContext;
  }
}

export {}; // 对于 TypeScript 来说，将其当作一个模块来处理是很有必要的
```
:::

::: tip 提示：
使用 `declare module` 来注册类型是一种标准的 TypeScript 技术，被称作[模块扩充](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)。你可以在 `tsconfig.json` 文件的 `include` 字段涵盖的任何 TypeScript 文件中进行此操作，但我们建议在你的应用目录内使用专门的 `env.ts` 文件来操作。 
:::

👉 **使用新类型**

一旦你采用了新的类型生成方式，就可以移除对 `LoaderFunctionArgs`/`ActionFunctionArgs` 的扩充内容，并改为使用 `Route.LoaderArgs` 和 `Route.ActionArgs` 中的 `context` 参数。 

::: code-group
```ts [app/env.ts]
declare module "react-router" {
  // 你在v2版本中使用的 `AppLoadContext`
  interface AppLoadContext {
    whatever: string;
  }
}

export {}; // 对于 TypeScript 来说，将其当作一个模块来处理是很有必要的
```
:::

::: code-group
```tsx [app/routes/my-route.tsx]
import type { Route } from "./+types/my-route";

export function loader({ context }: Route.LoaderArgs) {}
// { whatever: string }  ^^^^^^^

export function action({ context }: Route.ActionArgs) {}
// { whatever: string }  ^^^^^^^
```
:::

恭喜你！你现在已经使用 React Router v7 了。继续运行你的应用程序，确保一切都按预期运行。

