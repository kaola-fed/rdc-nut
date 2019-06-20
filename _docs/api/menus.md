---
title: 获取菜单列表
order: 7
---

> GET /api/menus

获取菜单信息

##### 请求参数：无

##### 响应数据：
```table
字段
类型
说明
|- list
| Array<Menus>
| 菜单列表
```

Menus 数据结构：

```table
字段
类型
说明
|- title
| String
| 菜单名
|- url
| String
| 菜单url
|- children
| Array<Menus>
| 子菜单
```

##### 示例：
```json
{
    "code": 200,
    "result": {
        "list": [
            {
                "title": "Demo",
                "url": "",
                "children": [
                    {
                        "title": "列表页",
                        "url": "",
                        "children": [
                            {
                                "title": "regular列表",
                                "url": "/pages/demo.regular/index/index",
                                "children": []
                            },
                            {
                                "title": "vue列表",
                                "url": "/pages/demo.vue/index/index",
                                "children": []
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```
