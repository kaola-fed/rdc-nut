---
title: 关于
subTitle: About
order: 12
---

### 关于

&emsp;&emsp;RDC-NUT是基于RDE模式开发的考拉中后台容器，你可以使用它快速创建一个标准的考拉中后台业务工程


> 背景

- 目前考拉存在大量的中后台业务前端工程，每个工程都在重复开发基础设施
- 目前的脚手架只负责初始化，各个工程后续维护、升级需要耗费大量人力
- 在接入一个新的插件时，各个工程均要重复劳动接入

&emsp;&emsp;为了解决上述存在的问题，我们基于现有的考拉中后台规范和特点，开发了RDC-NUT

> 解决的问题

- 中后台业务工程与工程基础设施相分离，业务开发更聚焦于业务开发，忽略业务无关的配置
- 统一中后台业务工程的开发规范，包括目录规范、代码规范、lint规则等，开发人员在各工程间可以无缝切换
- 集中接入、维护各个插件，例如：hubble、sentry、feedback等，方便统一升级基础配置

> 适用范围

&emsp;&emsp;考拉中后台前端工程

> 特性

* RDE Integrate模式
* 基于 [Nut](https://github.com/kaola-fed/rdc-nut)
* 支持 Regular、Vue
* 默认接入hubble、sentry、feedback等
* 提供统一的登录页、404页、未授权页等场景页
* 默认集成RDS-VUE、echarts、dayjs等常用js库

