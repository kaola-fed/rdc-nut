import Vue from 'vue';

import eventBus from '~/eventbus';
import Layout from './layout';

export default {
    name: 'layout-kaola-basic',

    type: 'layout',

    async apply(ctx) {
        let layout = null;
        let el = null;

        await ctx.api.layout.register({
            name: 'kaola-basic',

            mount(node, {
                ctx
            }) {
                if (!layout) {
                    Vue.config.devtools = process.env.NODE_ENV === 'development';

                    layout = new Vue( Layout, {
                        props: {
                            $ctx: ctx
                        }
                    });

                    if ( window.__VUE_DEVTOOLS_GLOBAL_HOOK__ ) {
                        window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = layout.constructor;
                    }

                    eventBus.$on('requestError', (res, catchError) => {
                        ctx.events.emit('layout:requestError', res, catchError);
                    });
                }

                if (el) {
                    node.appendChild(layout.$el);
                } else {
                    el = document.createElement('div');
                    node.appendChild(el);
                    layout.$mount(el);
                }
            },

            unmount(node) {
                if (!layout) {
                    return;
                }

                if (layout.$el && (layout.$el.parentNode === node)) {
                    node.removeChild(layout.$el);
                }
            },

            update(data = {}) {
                if (!layout) {
                    return;
                }

                if (data.ctx) {
                    layout.$ctx = data.ctx;
                }
                layout.$forceUpdate();
            },

            getMountNode() {
                return layout && layout.$refs.$$mount;
            },
        });
    }
};
