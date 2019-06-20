---
title: 获取常用菜单
order: 4
---

> GET /api/favorMenus

获取用户常用菜单信息（三级菜单Layout 需要提供以下接口）

##### 请求参数：无
##### 响应数据：

```table
字段
类型
说明
|- list
| Array<favorMenus>
| 菜单信息
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

##### 示例：
```json
{
    "code": 200,
    "message": null,
    "result": {
        "list": [
            {
                "title": "收货异常任务",
                "url": "/app/qc-analysis/receiptGoodsAbnormal/index"
            },
            {
                "title": "客诉明细",
                "url": "/app/qc-complain/detail/list"
            }
        ]
    }
}
```
