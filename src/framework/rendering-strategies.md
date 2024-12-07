# 渲染策略

在 React Router 中存在三种渲染策略：

- 客户端渲染
- 服务器端渲染
- 静态预渲染

## 客户端渲染

在用户浏览应用程序进行页面导航时，路由始终是在客户端进行渲染的。如果您打算构建一个单页应用（Single Page App，简称 SPA），那么需要禁用服务器端渲染。

::: code-group

```ts [react-router.config.ts]
import type { Config } from "@react-router/dev/config";

export default {
  ssr: false,
} satisfies Config;
```

:::

## 服务器端渲染

::: code-group

```ts [react-router.config.ts]
import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
} satisfies Config;
```

:::

服务器端渲染需要有支持它的部署环境。尽管它是一个全局性的设置，但个别路由仍然可以采用静态预渲染的方式。此外，路由还能够借助客户端加载器（`clientLoader`）进行客户端数据加载，以此避免对其对应的那部分用户界面（UI）进行服务器端渲染及数据获取操作。

## 静态预渲染

::: code-group

```ts [react-router.config.ts]
import type { Config } from "@react-router/dev/config";

export default {
  // 在构建时返回一个要进行预渲染的 URL 列表
  async prerender() {
    return ["/", "/about", "/contact"];
  },
} satisfies Config;
```

:::

静态预渲染是一种在构建时进行的操作，它会为一系列的 URL 生成静态 HTML 以及客户端导航数据有效负载。这对于搜索引擎优化（SEO）和性能提升方面很有帮助，尤其适用于那些没有采用服务器端渲染的部署环境。在进行预渲染时，路由模块加载器（route module loaders）会被用于在构建时获取数据。
