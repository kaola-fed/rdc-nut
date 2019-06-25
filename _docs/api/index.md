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
|- 401
| 用户未登录
|- 403
| 用户无权限
|- 100x
| 后端业务code 统一使用 100x
```

&emsp;

##### 特殊结构规范

1. 下拉选择的kv命名为id与name，因为regular-ui库的默认值为id和name；
2. 变量命名尽量简短，类名/接口名等已经说明含义的情况下，字段名不要加前缀，如“forwarderQuotationInfoChargeVo”，可以优化为：“infoVo”；
3. 列表需要分页时，前端传给后端的分页信息变量名固定为：pageSize表示一页显示多少条，pageNo当前是第几页；服务端返回的总数变量名为total；老工程可能名称定义的不统一，如果是调用其他工程接口获取到的数据，需要后端转换为此种格式再传给前端；
4. 枚举数字定义从1开始；全部为0，其他、不存在等为-1；boolean意义的枚举，1表示是，0表示否；
5. 表单页面，如下拉选择，传给后端的是Number类型的id，非编辑状态下回显的时候，除了id字段， 还需要返回转换为字符串的变量，这个变量命名统一为variableName\(id类型的变量名后面加Name\)；
6. select和multiselect使用时，要注意涉及到多选 的时候，如果需要全部选择，全选的时候传给后端是空（或者其他某个约定的字段）而不是传全部的id；类目多选传根节点的id而不是 叶子节点的id；因为如果传全部id，后续全局数据变化（新增/删除）后，有问题；

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
