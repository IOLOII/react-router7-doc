# URL 传值

## 路由参数

路由参数从动态参数中解析。

```tsx
<Route path="/concerts/:city" element={<City />} />
```

在上面的案例中，`city` 是一个路由参数，它可以从 `useParams` 钩子中获取。

```tsx
import { useParams } from "react-router";

function City() {
  let { city } = useParams();
  let data = useFakeDataLibrary(`/api/v2/cities/${city}`);
  // ...
}
```

## URL 查询参数

查询参数是 URL 中 `?` 后面的值。可通过 `useSearchParams` 来获取它们，该函数会返回一个 [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) 的实例。

```tsx
function SearchResults() {
  let [searchParams] = useSearchParams();
  return (
    <div>
      <p>
        You searched for <i>{searchParams.get("q")}</i>
      </p>
      <FakeSearchResults />
    </div>
  );
}
```

## Location 对象

React Router 会创建一个自定义 `location` 对象，该对象包含一些有用的信息，可通过 `useLocation` 来获取这些信息。

```ts
function useAnalytics() {
  let location = useLocation();
  useEffect(() => {
    sendFakeAnalytics(location.pathname);
  }, [location]);
}

function useScrollRestoration() {
  let location = useLocation();
  useEffect(() => {
    fakeRestoreScroll(location.key);
  }, [location]);
}
```
