---
title: 常用菜单排序
order: 1
---

> POST /api/favorMenus/sort

排序用户常用菜单（三级菜单Layout 需要提供以下接口）

##### 请求参数：
```table
字段
类型
说明
|- menus
| Array<favorMenus>
| 菜单列表
```

favorMenus 数据结构：
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
POST /api/favorMenus/sort

{
    "menus": [
        {
            "title": "vue列表",
            "url": "/pages/demo.vue/index/index",
        },
        {
            "title": "regular列表",
            "url": "/pages/demo.regular/index/index",
        }
    ]
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
