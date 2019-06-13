export default {
    name: 'common-pages',

    apply({
        api,
        events
    }, options) {
        api.page('pages/login/index@common-pages').set('layout', 'none');

        events.on('route:login', () => {
            location.href = '/pages/login/index@common-pages';
        });
        events.on('route:unauthorized', () => {
            api.router.replace({
                page: 'pages/unauthorized/index'
            })
        });
    }
}
