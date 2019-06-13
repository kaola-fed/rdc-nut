export default async function app(ctx) {
    // 设置 首页
    ctx.api.homepage.set('pages/demo.regular/index/index')

    // 设置 特定页面的 layout
    ctx.api.page('pages/demo.vue/form/index').set('layout', 'kaola-basic')

    // 设置 特定页面的 alias
    ctx.api.router.alias('pages/demo.regular/index/index', '/demoRegular/index')

    ctx.events.on('layout:logout', () => {
        console.log('listen layout:logout from app.js');
    })

    ctx.events.on('layout:requestError', (res) => {
        console.log('listen requestError', res);

        if (res.code == 1007) {
            ctx.events.emit('route:login');
        }
        if (res.code == 1006) {
            ctx.events.emit('route:unauthorized');
        }
    })
}
