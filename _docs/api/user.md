---
title: 获取用户信息
order: 8
---

> GET /api/user

获取用户信息

##### 请求参数：无

##### 响应数据：
```table
字段
类型
说明
|- nickName
| String
| 用户昵称
|- name
| String
| 用户工号
```


##### 示例：
```json
{
    "code": 200,
    "message": null,
    "result": {
        "nickName": "管理员",
        "name": "Hxxxx"
    }
}
```
