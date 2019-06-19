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
| html中head的title值、页面的title
|- head.styles
| -
| html中head要添加的css链接
| 数组，例如：['xxx/xxx.css']
```

> api 配置（具体查看[RDC-NUT API](https://kaola-fed.github.io//specification/api.html)）

```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- api.getUserInfo
| -
| 获取用户信息 url
| 默认值：/api/user
|- api.getMenus
| -
| 获取菜单信息 url
| 默认值：/api/menus
|- api.logout
| -
| 退出登录 url
| 默认值：/api/logout
|- api.getFavorMenus
| -
| 获取用户常用菜单信息 url
| 默认值：/api/favorMenus
|- api.addFavorMenu
| -
| 添加用户常用菜单 url
| 默认值：/api/favorMenus/add
|- api.removeFavorMenu
| -
| 删除用户常用菜单 url
| 默认值：/api/favorMenus/remove
|- api.sortFavorMenus
| -
| 排序用户常用菜单 url
| 默认值：/api/favorMenus/sort
```

> hubble 配置

```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- hubble.disable
| -
| 是否关闭hubble，建议开启
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
| 是否关闭sentry，建议开启
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
| https://[key]@sentry.kaola.com/[project-id]
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
| 是否引入feedback脚本，加上背景水印，建议开启
| 默认开启
```

> proxy 配置
- proxy.host 设置 hostname，用于网关识别
- proxy.rules 数组
```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- proxy.prefix
| -
| 需要代理的请求前缀
| 例：'/api'
|- proxy.targe
| -
| 配置代理的后端服务
| 例：'http://127.0.0.1:3000'
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
            testKey: 'MA-XXXX',
            onlineKey: 'MA-XXXXX',
        },
        feedback: {
            disable: false
        },
        sentry: {
            org: 'kaolafed',
            project: 'kaola-rhea-fed',
            dsn: 'https://xxxx@sentry.kaola.com/xx',
            token: 'xxxx',
        },
        proxy: {
            host: 'ms.kaola.com',
            rules: [
                {
                    prefix: '/api',
                    target: 'http://10.198.172.253:8009'
                },
                {
                    prefix: '/sc-workdesk',
                    target: 'http://10.198.172.253:8009'
                },
            ]
        },
        plugins: [
            '/install.js'
        ],
        rdsVue: [
            {
                key: 'authUrl', value: '"/api/common/auth"'
            },
            {
                key: 'selectUrl', value: `function() {
                    return '/api/regular/selectList';
                }`
            }
        ]
    }
}
```
