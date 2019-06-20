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

> 以下接口说明中，响应数据默认简写为result数据
