---
title: 规范
subTitle: BEM
order: 10
category: 样式 Styles
categoryOrder: 4
---

### 样式规范

RDC-NUT提供[BEM](https://en.bem.info/methodology/quick-start/)的支持，请使用如下语法编写

```css
@include b(module) {
    @include e(child) {
        @include m(active) {
            font-size: 14px;
        }
    }
}
```
