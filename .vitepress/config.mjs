import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/react-router7-doc/",
  srcDir: "src",
  title: "React Router7 中文文档",
  description: "React Router v7 中文文档",
  head: [["link", { rel: "icon", href: "/react-router7-doc/favicon.ico" }]],
  themeConfig: {
    logo: {
      light: "rr_lockup_light.svg",
      dark: "/rr_lockup_dark.svg",
      alt: "React Router7 Logo",
    },
    siteTitle: "",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "指南", link: "/home" },
      { text: "参考", link: "https://api.reactrouter.com/v7/" },
    ],
    sidebar: [
      {
        text: "指南",
        collapsed: false,
        items: [
          {
            text: "框架",
            items: [
              { text: "安装", link: "/framework/installation" },
              { text: "路由", link: "/markdown-examples/quick-start" },
              { text: "路由模块", link: "/markdown-examples/nested-routes" },
              { text: "渲染策略", link: "/markdown-examples/redirects" },
              { text: "数据加载", link: "/markdown-examples/relative-paths" },
              { text: "Actions", link: "/markdown-examples/relative-paths" },
              { text: "导航", link: "/markdown-examples/relative-paths" },
              {
                text: "加载中的用户界面",
                link: "/markdown-examples/relative-paths",
              },
              { text: "测试", link: "/markdown-examples/relative-paths" },
              { text: "自定义框架", link: "/markdown-examples/relative-paths" },
            ],
          },
          {
            text: "库",
            items: [
              { text: "安装", link: "/markdown-examples/relative-paths" },
              { text: "路由", link: "/markdown-examples/relative-paths" },
              { text: "导航", link: "/markdown-examples/relative-paths" },
              { text: "URL 值", link: "/markdown-examples/relative-paths" },
            ],
          },
        ],
      },
      {
        text: "更新",
        collapsed: false,
        items: [
          { text: "从 v6 升级", link: "/markdown-examples/relative-paths" },
          { text: "从 Remix 升级", link: "/markdown-examples/relative-paths" },
          {
            text: "从 Component Routes 进行框架改造",
            link: "/markdown-examples/relative-paths",
          },
          {
            text: "从 RouterProvider 进行框架改造",
            link: "/markdown-examples/relative-paths",
          },
        ],
      },
      {
        text: "示例",
        collapsed: false,
        items: [
          { text: "错误边界", link: "/markdown-examples/relative-paths" },
          { text: "错误上报", link: "/markdown-examples/relative-paths" },
          { text: "使用Fetchers", link: "/markdown-examples/relative-paths" },
          {
            text: "File Route 规范",
            link: "/markdown-examples/relative-paths",
          },
          { text: "文件上传", link: "/markdown-examples/relative-paths" },
          { text: "表单验证", link: "/markdown-examples/relative-paths" },
          { text: "HTTP 请求头", link: "/markdown-examples/relative-paths" },
          { text: "预渲染", link: "/markdown-examples/relative-paths" },
          { text: "资源文件路由", link: "/markdown-examples/relative-paths" },
          {
            text: "路由模块类型安全",
            link: "/markdown-examples/relative-paths",
          },
          {
            text: "单文件应用(SPA)",
            link: "/markdown-examples/relative-paths",
          },
          { text: "状态码", link: "/markdown-examples/relative-paths" },
          {
            text: "流加载与Suspense相结合",
            link: "/markdown-examples/relative-paths",
          },
          { text: "视图过渡", link: "/markdown-examples/relative-paths" },
        ],
      },
      {
        text: "说明",
        collapsed: false,
        items: [
          { text: "自动代码分割", link: "/markdown-examples/relative-paths" },
          { text: "热更新", link: "/markdown-examples/relative-paths" },
          { text: "竞态条件", link: "/markdown-examples/relative-paths" },
          { text: "特殊文件", link: "/markdown-examples/relative-paths" },
          { text: "类型安全", link: "/markdown-examples/relative-paths" },
        ],
      },
      {
        text: "团队",
        collapsed: false,
        items: [
          {
            text: "API开发策略",
            link: "https://github.com/gongph/react-router7-doc/issues",
          },
          {
            text: "贡献",
            link: "https://github.com/gongph/react-router7-doc/pulls",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/gongph/react-router7-doc" },
    ],
  },
});
