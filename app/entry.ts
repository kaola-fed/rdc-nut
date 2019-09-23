// import { KLModal } from 'nek-ui';

export default async function app(ctx) {
    // 设置 首页
    ctx.api.homepage.set('pages/__demo__/regular/index/index');

    // 设置 特定页面的 layout
    ctx.api.page('pages/__demo__/vue/form/index').set('layout', 'kaola-basic');

    // 设置 特定页面的 alias
    ctx.api.router.alias('pages/__demo__/regular/index/index', '/demoRegular/index');

    ctx.events.on('layout:logout', () => {
        location.href = `/api/login?redirect=${encodeURIComponent(window.location.href)}`;
    });
}
