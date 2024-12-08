import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/react-router7-doc/",
  srcDir: "src",
  title: "React Router7 中文文档",
  description: "React Router v7 中文文档",
  head: [["link", { rel: "icon", href: "/react-router7-doc/favicon.ico" }]],
  ignoreDeadLinks: true,
  themeConfig: {
    logo: {
      light: "/rr_lockup_light.svg",
      dark: "/rr_lockup_dark.svg",
      alt: "React Router7 Logo",
    },
    siteTitle: "",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "指南", link: "/home" },
      { text: "API", link: "https://api.reactrouter.com/v7/" },
      {
        text: "生态系统",
        items: [
          {
            text: "官方库",
            items: [
              { text: "React", link: "https://reactjs.org/" },
              {
                text: "React 中文文档",
                link: "https://zh-hans.react.dev/learn",
              },
              { text: "Redux", link: "https://redux.js.org/" },
              { text: "React Redux", link: "https://react-redux.js.org/" },
            ],
          },
          {
            text: "第三方库",
            items: [
              {
                text: "Styled components",
                link: "https://styled-components.com/docs",
              },
              {
                text: "Framer motion",
                link: "https://motion.dev/",
              },
              {
                text: "Framer motion 中文文档",
                link: "https://motion.framer.wiki/introduction",
              },
            ],
          },
          {
            text: "UI",
            items: [
              {
                text: "React Icons",
                link: "https://react-icons.github.io/react-icons/",
              },
              {
                text: "Tailwindcss",
                link: "https://tailwindcss.com",
              },
            ],
          },
        ],
      },
    ],
    outline: [2, 3],
    sidebar: [
      {
        text: "指南",
        collapsed: false,
        items: [
          {
            text: "框架",
            items: [
              { text: "安装", link: "/framework/installation" },
              { text: "路由", link: "/framework/routing" },
              { text: "路由模块", link: "/framework/route-module" },
              { text: "渲染策略", link: "/framework/rendering-strategies" },
              { text: "数据加载", link: "/framework/data-loading" },
              { text: "Actions", link: "/framework/actions" },
              { text: "导航", link: "/framework/navigating" },
              {
                text: "待处理的UI",
                link: "/framework/pending-ui",
              },
              { text: "测试", link: "/framework/routing" },
              { text: "自定义框架", link: "/framework/routing" },
            ],
          },
          {
            text: "库",
            items: [
              { text: "安装", link: "/framework/routing" },
              { text: "路由", link: "/framework/routing" },
              { text: "导航", link: "/framework/routing" },
              { text: "URL 值", link: "/framework/routing" },
            ],
          },
        ],
      },
      {
        text: "更新",
        collapsed: false,
        items: [
          { text: "从 v6 升级", link: "/framework/routing" },
          { text: "从 Remix 升级", link: "/framework/routing" },
          {
            text: "从 Component Routes 进行框架改造",
            link: "/framework/routing",
          },
          {
            text: "从 RouterProvider 进行框架改造",
            link: "/framework/routing",
          },
        ],
      },
      {
        text: "示例",
        collapsed: false,
        items: [
          { text: "错误边界", link: "/framework/routing" },
          { text: "错误上报", link: "/framework/routing" },
          { text: "使用Fetchers", link: "/how-tos/fetchers" },
          {
            text: "File Route 规范",
            link: "/framework/routing",
          },
          { text: "文件上传", link: "/framework/routing" },
          { text: "表单验证", link: "/framework/routing" },
          { text: "HTTP 请求头", link: "/framework/routing" },
          { text: "预渲染", link: "/framework/routing" },
          { text: "资源文件路由", link: "/framework/routing" },
          {
            text: "路由模块类型安全",
            link: "/framework/routing",
          },
          {
            text: "单文件应用(SPA)",
            link: "/framework/routing",
          },
          { text: "状态码", link: "/framework/routing" },
          {
            text: "流加载与Suspense相结合",
            link: "/framework/routing",
          },
          { text: "视图过渡", link: "/framework/routing" },
        ],
      },
      {
        text: "说明",
        collapsed: false,
        items: [
          { text: "自动代码分割", link: "/framework/routing" },
          { text: "热更新", link: "/framework/routing" },
          { text: "竞态条件", link: "/framework/routing" },
          { text: "特殊文件", link: "/framework/routing" },
          { text: "类型安全", link: "/framework/routing" },
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
