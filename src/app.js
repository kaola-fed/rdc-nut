export default async function app(ctx) {
    // 配置一下入口文件
    ctx.api.sidebar.configure([
        {
            title: '首页',
            children: [
                {title: '首页', path: 'pages/demo.regular/index/index'}
            ]
        }
    ]);
}
