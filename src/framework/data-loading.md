# 数据加载

数据是通过加载器（`loader`）和客户端加载器（`clientLoader`）提供给路由组件的。

加载器数据会自动从加载器中进行序列化操作，然后在组件中进行反序列化。除了像字符串、数字这类基本数据类型的值以外，加载器还能够返回 promises、maps、sets、dates 等多种类型的数据。

## 客户端数据加载

客户端加载器（`clientLoader`）用于在客户端（也就是浏览器端）获取数据。对于那些你更倾向于仅从浏览器去获取数据的页面或者整个项目而言，它是非常有用的。

::: code-group

```tsx [app/product.tsx]
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(`/api/products/${params.pid}`);
  const product = await res.json();
  return product;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```

:::

## 服务器端数据加载

在服务器端渲染的情况下，加载器（`loader`）既用于初始页面加载，也用于客户端导航（client navigations）。在客户端导航期间，加载器会通过 React Router 自动从浏览器向服务器发起获取数据的 `fetch` 请求。

::: code-group

```tsx [app/product.tsx]
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";
import { fakeDb } from "../db";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await fakeDb.getProduct(params.pid);
  return product;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```

:::

需要注意的是，`loader` 函数会从客户端的打包代码包（bundles）中移除，这样一来，你就能够使用仅在服务器端可用的应用程序接口（APIs），而无需担心它们会被包含在浏览器端的代码中。

## 静态数据加载

在进行预渲染时，加载器（loaders）会被用于在生产构建阶段获取数据。

::: code-group

```tsx [app/product.tsx]
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";

export async function loader({ params }: Route.LoaderArgs) {
  let product = await getProductFromCSVFile(params.pid);
  return product;
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const { name, description } = loaderData;
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```

:::

在 `react-router.config.ts` 文件中指定需要预渲染的 URL：

::: code-group

```ts [react-router.config.ts]
import type { Config } from "@react-router/dev/config";

export default {
  async prerender() {
    let products = await readProductsFromCSVFile();
    return products.map((product) => `/products/${product.id}`);
  },
} satisfies Config;
```

:::

需要注意的是，在服务器端渲染时，任何未进行预渲染的 URL 对应的页面将会像往常一样进行服务器端渲染。这一机制使得你能够针对单个路由预渲染部分数据，同时对其余部分仍采用服务器端渲染的方式来处理。

## 同时使用两种加载器

加载器（`loader`）与客户端加载器（`clientLoader`）是可以一起使用的。加载器会在服务器端用于初始的服务器端渲染（Server Side Rendering，简称 SSR）或者静态预渲染（Pre-rendering）操作，而 `clientLoader` 则会在后续的客户端导航（client-side navigations）过程中被使用。

::: code-group

```tsx [app/product.tsx]
// route("products/:pid", "./product.tsx");
import type { Route } from "./+types/product";
import { fakeDb } from "../db";

export async function loader({ params }: Route.LoaderArgs) {
  return fakeDb.getProduct(params.pid);
}

export async function clientLoader({ params }: Route.ClientLoader) {
  const res = await fetch(`/api/products/${params.pid}`);
  return res.json();
}

export default function Product({ loaderData }: Route.ComponentProps) {
  const { name, description } = loaderData;

  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
}
```

:::
