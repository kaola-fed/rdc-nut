---
title: API
subTitle: 规范
order: 9
---

### API 规范

##### 响应数据格式规范

所有响应数据最外层结构如下：

```table
字段
类型
说明
|- code
| Number
| 状态码
|- message
| String
| 提示信息
|- result
| Object
| 数据结构
```

> 以下接口说明中，响应数据默认简写为result数据

&emsp;

##### 状态码说明

```table
code值
说明
|- [200, 400)
| 响应正常
|- 403
| 用户无权限
|- 10007
| 用户未登录
```

&emsp;

##### 如何写请求

考拉中后台系统接入cas，前端需要对一些按钮、区域等做权限控制。我们目前的方案是进入页面后，先将页面的所有操作相关的请求url收集起来，统一发送到后端的鉴权接口，
根据后端返回的数据决定页面的这些按钮、区域是否展示。

我们将页面的所有请求都提取到页面级别目录下的api.js中，并对外暴露出可以用于发请求的API、和发送给后端
鉴权接口所需的数据authApis。

```javascript
// api.js
import { getApis } from '~/widget/request';

const list = [
    { key: 'getList', url: '/api/vue/demo/list', type: 'post' },
    { key: 'exportList', url: '/api/vue/demo/export', type: 'post' },
];

export const API = getApis(list).API;
export const authApis = getApis(list).authApis;
```

```javascript
// index.js
import { API, authApis } from './api.js';

// regular
config(data) {
    _.extend(data, {
        authApis
    });
    this.supr(data);
}
// vue
data() {
    return {
        authApis
    }
}

...
async getList() {
    try {
        const { result } = await API.getList({...});
        ...
    } catch (err) {
        console.log(err);
    }
}
...
```

```html
// index.html
// regular
<auth-provider authApis={authApis}>
    <auth key="exportList">
        <kl-button>导出</kl-button>
    </auth>
</auth-provider>

// index.vue
// vue 待完善
<el-button v-if="authMaps['exportList']">导出</el-button>

```
