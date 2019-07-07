import eventBus from '~/eventbus';

import Layout from './layout';

export default {
    name: 'layout-kaola-basic',

    type: 'layout',

    async apply(ctx) {
        let layout = null;

        await ctx.api.layout.register({
            name: 'kaola-basic',

            mount(node, {
                ctx
            }) {
                if (!layout) {
                    layout = new Layout();
                    eventBus.$on('requestError', (res, catchError) => {
                        ctx.events.emit('layout:requestError', res, catchError);
                    });
                }

                layout.$mount(node);
            },

            unmount() {
                if (!layout) {
                    return;
                }

                layout.$destroy();
            },

            update(data = {}) {
                if (!layout) {
                    return;
                }

                layout.ctx = data.ctx;
                layout.$forceUpdate();
            },

            getMountNode() {
                return layout && layout.$refs.$$mount;
            },
        });
    }
};
