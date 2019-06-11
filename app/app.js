export default async function app(ctx) {
    // 设置 首页
    ctx.api.homepage.set('pages/demo.regular/index/index')

    // 设置 特定页面的 layout
    ctx.api.page('pages/demo.vue/form/index').set('layout', 'kaola-menu2')

    // 设置 特定页面的 alias
    ctx.api.router.alias('pages/demo.regular/index/index', '/demoRegular/index')
}
