---
title: 添加常用菜单
order: 3
category: 请求 API
categoryOrder: 6
---

> POST /api/favorMenus/add

添加用户常用菜单

##### 请求参数：
```table
字段
类型
说明
|- title
| String
| 菜单名称
|- url
| String
| 菜单url
```

```json
// 示例
POST /api/favorMenus/add

{
    "title": "vue列表",
    "url": "/pages/demo.vue/index/index",
}
```

##### 响应数据：
```json
// 示例
{
    "code": 200,
    "message": null,
    "result": null
}
```
