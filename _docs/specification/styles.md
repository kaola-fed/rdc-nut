---
title: 样式规范
subTitle: Styles
order: 8
category: Specification
---

### 样式规范

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

