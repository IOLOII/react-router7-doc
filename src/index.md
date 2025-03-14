---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Router7"
  text: "下一代 React 路由框架"
  tagline: 一款以用户为核心、聚焦标准、采用多策略的路由器，你可以将其部署在任何地方。
  image:
    light: /rr_logo_light.svg
    dark: /rr_logo_dark.svg
    alt: React Router7
  actions:
    - theme: brand
      text: 快速开始
      link: /home
    - theme: alt
      text: 官方文档
      link: https://reactrouter.com/
    - theme: alt
      icon: github
      text: GitHub
      link: https://github.com/remix-run/react-router

features:
  - icon: 🔗
    title: 非破坏性的
    details: 从 v6 升级到 v7 是一次非破坏性的升级。你可以继续按照原来的使用方式来使用 React Router。
  - icon: 📦
    title: 桥接React 19
    details: 全新的打包、服务器端渲染、预渲染以及流（streaming）相关特性，能让你逐步弥合从 React 18 到 19 之间的差距。
  - icon: 🍃
    title: 类型安全
    details: 全新的类型生成（typegen）功能为路由参数、加载器数据、操作等提供了一流的类型支持。
---
