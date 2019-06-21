---
title: 删除常用菜单
order: 2
---

> POST /api/favorMenus/remove

删除用户常用菜单（三级菜单Layout 需要提供以下接口）

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
POST /api/favorMenus/remove

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
