---
title: 定位
subTitle: Position
order: 7
---

### 位置相关

```css
/* 清除浮动 */
.f-cb:after,.f-cbli li:after{display:block;clear:both;visibility:hidden;height:0;overflow:hidden;content:".";}
.f-cb,.f-cbli li{zoom:1;}

/* display*/
.f-ib{display:inline-block;*display:inline;*zoom:1;}
.f-dn{display:none;}
.f-db{display:block;}

/* 浮动float */
.f-fl{float:left;}
.f-fr{float:right;}

/* 定位   */
.f-pr{position:relative;}
.f-pf{position:fixed;}
.f-oh{overflow:hidden;}

/* 元素中的文本的水平对齐方式 */
.f-tal{ text-align:left; }
.f-tac{ text-align:center; }
.f-tar{ text-align:right; }
.f-taj{ text-align:justify;text-justify:inter-ideograph; }

/* 元素的垂直对齐方式   */
.f-vat{vertical-align:top;}
.f-vam,.f-vama *{vertical-align:middle;}
.f-vab{vertical-align:bottom;}
.f-vas { vertical-align:super; }
```
