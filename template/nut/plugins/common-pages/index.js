export default {
    name: 'common-pages',

    apply({
        api,
        events
    }) {
        api.page('pages/login/index@common-pages').set('layout', 'none');

        events.on('route:login', () => {
            api.router.push({
                page: 'pages/login/index'
            }, {
              scoped: true
            });
        });
        events.on('route:unauthorized', () => {
            api.router.replace({
                page: 'pages/unauthorized/index'
            }, {
              scoped: true
            });
        });
    }
};
