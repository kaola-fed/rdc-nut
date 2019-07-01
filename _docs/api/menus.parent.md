---
title: 获取父级菜单
order: 6
---

> GET /api/menus/parent

获取父级菜单url

##### 请求参数：
```table
字段
类型
说明
|- url
| String
| 当前页面pathname
```

##### 响应数据：
```table
字段
类型
说明
|- url
| String
| 当前页面的父级菜单url
```


##### 示例：
```json
{
    "code": 200,
    "message": null,
    "result": {
        "url": "/pages/__demo__/vue/index/index"
    }
}
```
