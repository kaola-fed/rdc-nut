---
title: 支持命令
subTitle: Scripts
order: 10
---

### 支持命令

> rde serve

&emsp;&emsp;本地mock开发使用

> rde serve -e proxy

&emsp;&emsp;本地proxy开发

> rde build

&emsp;&emsp;build会在app目录下生成dist文件，如果需要可以查看，发布会自动发布这个文件

> rde build:prod

&emsp;&emsp;同`rde build`，会设置`app_env=prod`，即`IS_ONLINE`值为true，用于线上环境打包

> rde lint

&emsp;&emsp;lint并fix全工程

