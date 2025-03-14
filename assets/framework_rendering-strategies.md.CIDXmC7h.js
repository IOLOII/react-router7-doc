import{_ as i,c as a,o as t,ag as e}from"./chunks/framework.DmSB1il-.js";const E=JSON.parse('{"title":"渲染策略","description":"","frontmatter":{},"headers":[],"relativePath":"framework/rendering-strategies.md","filePath":"framework/rendering-strategies.md"}'),n={name:"framework/rendering-strategies.md"};function l(p,s,h,k,r,d){return t(),a("div",null,s[0]||(s[0]=[e(`<h1 id="渲染策略" tabindex="-1">渲染策略 <a class="header-anchor" href="#渲染策略" aria-label="Permalink to &quot;渲染策略&quot;">​</a></h1><p>在 React Router 中存在三种渲染策略：</p><ul><li>客户端渲染</li><li>服务器端渲染</li><li>静态预渲染</li></ul><h2 id="客户端渲染" tabindex="-1">客户端渲染 <a class="header-anchor" href="#客户端渲染" aria-label="Permalink to &quot;客户端渲染&quot;">​</a></h2><p>在用户浏览应用程序进行页面导航时，路由始终是在客户端进行渲染的。如果您打算构建一个单页应用（Single Page App，简称 SPA），那么需要禁用服务器端渲染。</p><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-O1W2y" id="tab-pfZHN9E" checked><label data-title="react-router.config.ts" for="tab-pfZHN9E">react-router.config.ts</label></div><div class="blocks"><div class="language-ts vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Config } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;@react-router/dev/config&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ssr: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">satisfies</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div></div></div><h2 id="服务器端渲染" tabindex="-1">服务器端渲染 <a class="header-anchor" href="#服务器端渲染" aria-label="Permalink to &quot;服务器端渲染&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-fc4SB" id="tab-EqXNasO" checked><label data-title="react-router.config.ts" for="tab-EqXNasO">react-router.config.ts</label></div><div class="blocks"><div class="language-ts vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Config } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;@react-router/dev/config&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  ssr: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">satisfies</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div></div></div><p>服务器端渲染需要有支持它的部署环境。尽管它是一个全局性的设置，但个别路由仍然可以采用静态预渲染的方式。此外，路由还能够借助客户端加载器（<code>clientLoader</code>）进行客户端数据加载，以此避免对其对应的那部分用户界面（UI）进行服务器端渲染及数据获取操作。</p><h2 id="静态预渲染" tabindex="-1">静态预渲染 <a class="header-anchor" href="#静态预渲染" aria-label="Permalink to &quot;静态预渲染&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-JeRw_" id="tab-ER_k9gJ" checked><label data-title="react-router.config.ts" for="tab-ER_k9gJ">react-router.config.ts</label></div><div class="blocks"><div class="language-ts vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { Config } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;@react-router/dev/config&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">export</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> default</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 在构建时返回一个要进行预渲染的 URL 列表</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  async</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> prerender</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/about&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/contact&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">];</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  },</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">satisfies</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Config</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre></div></div></div><p>静态预渲染是一种在构建时进行的操作，它会为一系列的 URL 生成静态 HTML 以及客户端导航数据有效负载。这对于搜索引擎优化（SEO）和性能提升方面很有帮助，尤其适用于那些没有采用服务器端渲染的部署环境。在进行预渲染时，路由模块加载器（route module loaders）会被用于在构建时获取数据。</p>`,12)]))}const c=i(n,[["render",l]]);export{E as __pageData,c as default};
