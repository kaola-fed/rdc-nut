---
title: 功能
subTitle: Function
order: 8
---

### 功能

> 内置套件

- [RDS-VUE](http://seven-kl.netease.com/docs/27432/#/component/layout)： 集成了RDS-VUE，可以直接使用RDS-VUE的组件、指令、过滤器等
- 布局： 内置了两级菜单（kaola-basic）、三级菜单（kaola-advanced）两种布局方案，可通过在`rda.config.js`中配置layout的值选择相应的布局

> 常用库（待补充）

- [nek-ui](http://nek-ui.kaolafed.com/)：regular组件库
- [echarts](https://echarts.baidu.com/)：图表库
- [dayjs](https://github.com/iamkun/dayjs)：时间库

> 数据统计

- [hubble](https://hubble.netease.com/)：默认开启hubble，需要在`rda.config.js`中配置hubble的testKey和onlineKey，分别对应测试环境和线上环境的key值
- [sentry](https://sentry.kaola.com)：默认开启sentry，需要在`rda.config.js`中配置sentry的相关配置，例如：`org`、`project`、`dsn`、`token`等
- feedback：默认开启feedback，页面加上背景水印

> 开发相关

- ts：默认支持ts
- mock：提供默认mock方案，`rde serve`默认使用mock数据
- proxy：提供默认proxy方案，`rde serve -e [proxyEnv]`使用proxy开发, proxyEnv可选值test、pre、online
