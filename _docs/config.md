---
title: 配置
subTitle: Config
order: 9
---

### rda.config.js 配置
```javascript
module.exports = {
  container: {
    name: 'rdebase/rdc-nut:{{version}}',
    render: {
        ...渲染时需要的变量
    },
  }
};
```

> head 配置

```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- head.title
| ●
| 业务工程的title
| -
|- head.styles
| -
| html中要添加的css链接
| 数组，例如：['xxx/xxx.css']
```

> api 配置

```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- api.getUserInfo
| -
| 获取用户信息 url
| 默认值：/api/common/getUserInfo
|- api.getMenus
| -
| 获取菜单信息 url
| 默认值：/api/common/getMenus
|- api.logout
| -
| 退出登录 url
| 默认值：/api/common/logout
|- api.getFavorMenus
| -
| 获取用户常用菜单信息 url
| 默认值：/api/common/getFavorMenus
|- api.addFavorMenu
| -
| 添加用户常用菜单 url
| 默认值：/api/common/addFavorMenu
|- api.removeFavorMenu
| -
| 删除用户常用菜单 url
| 默认值：/api/common/removeFavorMenu
|- api.sortFavorMenus
| -
| 排序用户常用菜单 url
| 默认值：/api/common/sortFavorMenus
```

> hubble 配置

```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- hubble.disable
| -
| 是否关闭hubble
| 默认开启
|- hubble.testKey
| ●
| hubble 测试环境的key值
| -
|- hubble.onlineKey
| ●
| hubble 线上环境的key值
| -
```

> sentry 配置

```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- sentry.disable
| -
| 是否关闭sentry
| 默认开启
|- sentry.org
| ●
| 工程所在的组名，参考.sentryclirc中的org
| -
|- sentry.project
| ●
| 工程名，参考.sentryclirc中的project
| -
|- sentry.token
| ●
| 工程的sentry token，参考.sentryclirc中的token
| -
|- sentry.release
| ●
| 工程版本号，一般以git commit id命名
| -
|- sentry.dsn
| ●
| sentry上的DSN值，请登录到sentry网站，查看工程的设置中的DSN
| -
```

> feedback 配置

```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- feedback.disable
| -
| 是否引入feedback脚本，加上背景水印
| 默认开启
```

> plugins 配置

```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- plugins
| -
| 用于在工程入口加载全局使用的插件
| 数组，相对于app目录下的绝对路径，`app/install.js`，则填写`/install.js`
```

### 示例
```javascript
{
    render: {
        head: {
            title: '考拉供应链管理系统',
            styles: [
                '//at.alicdn.com/t/font_393438_2tbubgazdlxo5hfr.css'
            ],
        },
        api: {
            getUserInfo: '/api/common/getUserInfo',
            getMenus: ''
        },
        hubble: {
            testKey: 'MA-8FAE-2AEEAA1727B7',
            onlineKey: 'MA-B4A8-445698C8D4FE',
        },
        feedback: {
            disable: false
        },
        sentry: {
            org: 'kaolafed',
            project: 'kaola-rhea-fed',
            release: gitVersion,
            dsn: 'https://a0bd3c16c5c843e697327f8ded21ee62@sentry.kaola.com/40',
            token: '29ccec3e738b46d19fa1157f889c6ab9a0927556c1934bfa9d8460dae14a5ae4',
        },
        plugins: [
            '/install.js'
        ]
    }
}
```
