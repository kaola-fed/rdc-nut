---
title: 目录结构
subTitle: Structure
order: 8
---

### 目录结构

`rde create`会生成如下目录结构：

```
|-- app/
|   |-- __mock__/
|   |   |-- get/ (GET请求)
|   |   |-- post/ (POST请求)
|   |-- pages/
|   |   |-- __demo__/
|   |   |   |-- regular/
|   |   |   |   |-- index/
|   |   |   |   |   |-- api.ts
|   |   |   |   |   |-- index.html
|   |   |   |   |   |-- index.ts
|   |   |   |   |   |-- index.scss
|   |   |   |-- vue/
|   |   |   |   |-- index/
|   |   |   |   |   |-- mixins/
|   |   |   |   |   |   |-- list.action.ts
|   |   |   |   |   |-- api.ts
|   |   |   |   |   |-- index.html
|   |   |   |   |   |-- index.ts
|   |   |   |   |   |-- index.scss
|   |-- entry.ts
|   |-- ...
|-- rda.config.js
```

&emsp;

#### pages（待补充物料生成规范）

pages 为页面级别目录，pages下文件会自动生成路由。

例如上方结构中的regular和 demo 页面会自动生成路由 `/pags/__demo__/regular/index/index` 和 `/pages/__demo__/vue/index/index`。

如果需要自定义路由名，可以在`app/entry.ts`中设置路由别名，下面会详细介绍 entry.ts。

&emsp;

#### app.js

app.js 文件会在工程启动时自动被[nut](https://nut.js.org/)加载，文件中可以设置应用级别的配置。例如：设置首页、设置路由别名、以及监听rdc-nut暴露出的事件。

```javascript
// entry.ts
export default async function app(ctx) {
    // 设置 首页
    ctx.api.homepage.set('pages/__demo__/regular/index/index');

    // 设置 页面的 layout
    ctx.api.page('pages/__demo__/vue/form/index').set('layout', 'kaola-basic');

    // 设置 页面的 alias
    ctx.api.router.alias('pages/__demo__/regular/index/index', '/demoRegular/index');

    // 监听 rdc-nut 暴露出的 退出登录事件
    ctx.events.on('layout:logout', () => {
        location.href = `/api/login?redirect=${encodeURIComponent(window.location.href)}`;
    });
}

```

&emsp;

#### __ mock __

__ mock __ 目录下存放mock数据，支持json和js两种格式，其中 js 文件 可以很简单的获取到请求参数，包括get请求和post请求

```javascript
// 统一下拉接口 selectKeys.js
const generateRandom = function(len = 5) {
    const source = [];
    while(len > 0) {
        const randomId = `${Math.random()}`.slice(-5);
        source.push({
            id: `${randomId}`,
            name: `下拉选项_${randomId}`
        });
        len--;
    }
    return source;
};

// get请求 和 post请求 请求参数均可从params上取
module.exports = function(params) {
    const { keys } = params;
    const keyList = keys.split(',');

    const result = Object.create(null);

    keyList.forEach((item) => {
        result[item] = existKeys[item] || generateRandom();
    });

    return {
        code: 200,
        result
    };
};

```

&emsp;


#### 别名

```table
别名
目录
|- @
| app目录
|- ~
| template/base目录
```

&emsp;

#### Regular常用基础组件

```table
文件
路径
|- BaseComponent.js
| ~/regular/BaseComponent.js
|- ListComponent.js
| ~/regular/ListComponent.js
|- BaseModal.js
| ~/regular/BaseModal.js
 ```

&emsp;

#### 其他路径

```table
文件
路径
|- request.js
| ~/request.js
```
