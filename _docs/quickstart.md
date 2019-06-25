---
title: 快速开始
subTitle: QuickStart
order: 11
---

### 快速开始

&emsp;
#### 创建工程

```shell
$ rde create

$ ? What is the name of project? > projectName

$ ? What kind of project to create? > Application

$ ? What kind of framework to use? > Vue

$ ? What is the name of container on docker hub? > rdebase/rdc-nut

$ ? What is the version of container? > {{rdc-nut latest version}}（填写具体版本号，请不要使用latest）
```

&emsp;&emsp;rdebase/rdc-nut 版本 请在[Docker Hub](https://hub.docker.com/r/rdebase/rdc-nut/tags)上查询

&emsp;&emsp;创建的新工程，默认会在`app/pages/__demo__`下生成regular 和 vue 两个demo页面，仅供参考

&emsp;
#### 配置rda.config.js

&emsp;&emsp;rde create 创建的工程，是一个简单的工程模板，因而工程创建之后，需要修改`rda.config.js`文件，配置业务工程独特的信息。具体配置参考 [RDC-NUT配置](/config.html)

##### 示例

```javascript
// rda.config.js
module.exports = {
  container: {
    name: 'rdebase/rdc-nut:{{version}}',
    render: {
        head: {
            title: '考拉xxx系统', // 必填
        },
        proxy: {
            host: 'ms.kaola.com', // 具体业务域名,
            rules: [
                { prefix: '/api' }, // 后端请求前缀，mock、proxy必填
            ]
        },
        sentry: {
            org: 'kaolafed',
            project: 'kaola-xxx', // 工程名
            dsn: 'https://xxxx@sentry.kaola.com/xx',
            token: 'xxxx',
        },
         hubble: {
            testKey: 'MA-XXXX',
            onlineKey: 'MA-XXXXX',
        },
        ...
    },
  },
  ...
};

```

&emsp;
#### 开发

&emsp;&emsp;使用`rde serve`命令，即可开始开发

&emsp;
#### 打包

&emsp;&emsp;使用`rde build`命令，打包后静态资源目录`app/dist`

