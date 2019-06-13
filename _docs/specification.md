---
title: 规范
subTitle: Specification
order: 8
---

### 工程结构

&emsp;&emsp;创建后会生成如下结构的RDA结构:

```
|-- app/
|   |-- __mock__/
|   |-- pages/
|   |-- app.js（可选）
|-- rda.config.js
```

```table
文件/目录 [@th width:80px]
说明
|- app/__mock__
| mock数据目录
|- app/pages
| 页面级别目录
|- app/app.js
| 可设置nut相关配置，比如路由alias等
|- rda.config.js
| 业务工程的配置，比如title、hubble Key、sentry Key等
```

### 样式开发

&emsp;&emsp;RDC已经提供了BEM的支持，请使用如下语法编写
```css
@include b(module) {
    @include e(child) {
        @include m(active) {
            font-size: 14px;
        }
    }
}
```
