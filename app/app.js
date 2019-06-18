export default async function app(ctx) {
    // 设置 首页
    ctx.api.homepage.set('pages/demo.regular/index/index');

    // 设置 特定页面的 layout
    ctx.api.page('pages/demo.vue/form/index').set('layout', 'kaola-basic');

    // 设置 特定页面的 alias
    ctx.api.router.alias('pages/demo.regular/index/index', '/demoRegular/index');

    ctx.events.on('layout:requestError', (res) => {
        if(res && res.code === 10000 || res.code === 10007 || res.retcode === 10007) {
            location.href = `/sc-workdesk/api/login?redirect=${encodeURIComponent(window.location.href)}`;
        } else if (res && res.code === 403) {
            location.href = '/app/access/unauthorized';
        }
    });
}
