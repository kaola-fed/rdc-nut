---
title: 配置
subTitle: Config
order: 9
---

### 开发前配置

rde create 创建的工程，是一个简单的工程模板，因而工程创建之后，需要修改`rda.config.js`文件，配置业务工程独特的信息。例如：工程名title、hubble的key、sentry的key以及proxy等。
这些配置可以写到 container > render 对象中，位置如下所示：

```javascript
module.exports = {
  container: {
    name: 'rdebase/rdc-nut:{{version}}',
    render: {
        ...渲染时需要的变量
    },
  },
  ...
};
```

&emsp;
> port 配置

配置开发端口，请和docker ports保持一致。默认：8080

&emsp;
> layout 配置

选择系统的布局方式，可选值kaola-basic（二级菜单）、kaola-advanced（三级菜单）。默认：kaola-advanced


&emsp;
> head 配置

配置index.html 的head

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

&emsp;
> api 配置（具体查看[RDC-NUT API](https://kaola-fed.github.io/api/index.html)）

Layout 内部发起的请求，可配置url

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
|- api.getParentUrl
| -
| 获取当前页面的父级菜单url
| 默认值：/api/menus/parent
|- api.logout
| -
| 退出登录 url
| 默认值：/api/logout
|- api.getFavorMenus
| -
| 获取用户常用菜单信息 url
| 默认值：/api/favorMenus
|- api.addFavorMenus
| -
| 添加用户常用菜单 url
| 默认值：/api/favorMenus/add
|- api.removeFavorMenus
| -
| 删除用户常用菜单 url
| 默认值：/api/favorMenus/remove
|- api.sortFavorMenus
| -
| 排序用户常用菜单 url
| 默认值：/api/favorMenus/sort
```

&emsp;
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

&emsp;
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

&emsp;
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

&emsp;
> proxy 配置
```table
配置项
是否必填
说明
备注
|- proxy.host
| ●
| 默认proxy到网关，host为服务发现的域名，例：ms.kaola.com
| proxy时请求头添加`X-Gateway-Host`，网关识别该字段
|- proxy.rules
| ●
| 数据类型：Array<proxyRules>
| 代理的规则，设置请求前缀、代理服务器
```

proxyRules 数据结构：
```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- prefix
| ●
| 需要代理的请求前缀，多个时使用英文逗号分隔`,`
| 例：'/api'、'/api,/sc-workdesk'
|- target
| -
| 配置代理的后端服务，默认target为网关
| 例：'http://127.0.0.1:3000'
```

&emsp;
> rdsVue 配置

RDC-NUT 内置rds-vue 套件，可传入rds-vue的配置，输入一个数组，数组里每一项结构如下：
```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- key
| ●
| rds-vue 的配置项字段
| -
|- value
| ●
| rds-vue 该配置项对应的值
| 传入函数时需用` ` 模板字符串包裹，可参考下方示例
```

&emsp;
> plugins 配置

当需要全局注册某些组件或者需要在入口加载某些文件时，可以配置plugins

```table
配置项 [@th width:80px]
是否必填 [@th width:80px]
说明
备注
|- plugins
| -
| 在工程入口加载全局使用的文件，用于注册组件、filter等
| Array，相对于app目录下的绝对路径，`app/install.js`，则填写`/install.js`
```

### 示例
```javascript
{
    render: {
        port: 8080,
        layout: 'kaola-advanced',
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
                    prefix: '/api,/sc-workdesk',
                },
                {
                    prefix: '/sc-other',
                    target: 'http://10.198.172.253:8009'
                },
            ]
        },
        rdsVue: [
            {
                key: 'authUrl', value: '"/api/common/auth"'
            },
            {
                key: 'selectUrl', value: `function() {
                    return '/api/regular/selectList';
                }`
            }
        ],
        plugins: [
            '/install.js'
        ]
    }
}
```
