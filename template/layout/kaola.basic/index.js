import eventBus from '../common/event.bus';
import '../common/plugins/index';

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
                    layout = new Layout({
                        data: {
                            ctx
                        }
                    });
                    eventBus.$on('requestError', (res, catchError) => {
                        ctx.events.emit('layout:requestError', res, catchError);
                    });
                }

                layout.$inject(node);
            },

            unmount() {
                if (!layout) {
                    return;
                }

                layout.$inject(false);
            },

            update(data = {}) {
                if (!layout) {
                    return;
                }

                layout.data.ctx = data.ctx;
                layout.$update();
            },

            getMountNode() {
                return layout && layout.$refs.$$mount;
            },
        });
    }
};
