---
title: API规范
subTitle: API
order: 8
category: Specification
---

### API 规范

> 获取用户信息

- 默认url：/api/common/getUserInfo
- 请求参数： GET
- 请求参数：无
- 返回值结构：
```json
// 示例
{
    "code": 200,
    "message": null,
    "result": {
        "userInfo": {
            "nickName": "管理员"
        }
    }
}
```

> 获取菜单信息

- 默认url：/api/common/getMenus
- 请求参数： GET
- 请求参数：无
- 返回值结构：
```json
// 示例
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
                                "url": "/pages/demo.vue/index/index"
                            }
                        ]
                    }
                ]
            }
        ]
    }
}
```

> 退出登录

- 默认url：/api/common/logout
- 请求参数： GET
- 请求参数：无
- 返回值结构：
```json
// 示例
{
    "code": 200,
    "message": null,
    "result": null
}
```

#### 三级菜单需要提供以下接口

> 获取用户常用菜单信息

- 默认url：/api/common/getFavorMenus
- 请求参数： GET
- 请求参数：无
- 返回值结构：
```json
// 示例
{
    "code": 200,
    "error": null,
    "message": null,
    "result": {
        "list": [
            {
                "count": null,
                "title": "收货异常任务",
                "url": "/app/qc-analysis/receiptGoodsAbnormal/index"
            },
            {
                "count": null,
                "title": "客诉明细",
                "url": "/app/qc-complain/detail/list"
            }
        ]
    },
    "success": true
}
```

> 添加用户常用菜单

- 默认url：/api/common/addFavorMenu
- 请求参数： POST
- 请求参数：
```json
{
    "title": "vue列表",
    "url": "/pages/demo.vue/index/index",
    "_favored": true
}
```
- 返回值结构：
```json
// 示例
{
    "code": 200,
    "message": null,
    "result": null
}
```

> 删除用户常用菜单

- 默认url：/api/common/removeFavorMenu
- 请求参数： POST
- 请求参数：
```json
{
    "title": "vue列表",
    "url": "/pages/demo.vue/index/index",
    "_favored": false
}
```
- 返回值结构：
```json
// 示例
{
    "code": 200,
    "message": null,
    "result": null
}
```

> 排序用户常用菜单

- 默认url：/api/common/sortFavorMenus
- 请求参数： POST
- 请求参数：
```json
{
    "menus": [
        {
            "title": "vue列表",
            "url": "/pages/demo.vue/index/index",
            "_favored": true,
            "_invalid": false
        },
        {
            "count": null,
            "title": "regular列表",
            "url": "/pages/demo.regular/index/index",
            "_invalid": false
        }
    ]
}
```
- 返回值结构：
```json
// 示例
{
    "code": 200,
    "message": null,
    "result": null
}
```
