export default {
    name: 'common-pages',

    apply({
        api,
        events
    }) {
        events.on('route:unauthorized', () => {
            api.router.replace({
                page: 'pages/unauthorized/index'
            }, {
                scoped: true
            });
        });
    }
};
