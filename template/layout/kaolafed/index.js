import './vue.entry';

import '../common/widget/hubble';
import Layout from './layout';

export default {
    name: 'layout-kaolafed',

    type: 'layout',

    async apply(ctx) {
        let layout = null

        await ctx.api.layout.register({
            name: 'kaolafed',

            mount(node, {
                ctx
            }) {
                if (!layout) {
                    const sidebar = ctx.api.sidebar.get()

                    sidebar.forEach(s => s.open = s.active)

                    layout = new Layout()

                    layout.$on('logout', () => {
                        ctx.events.emit('layout:logout')
                    })
                }

                layout.$mount(node)
            },

            unmount(node) {
                if (!layout) {
                    return
                }

                layout.$destroy();
            },

            update(data = {}) {
                if (!layout) {
                    return
                }

                layout.ctx = data.ctx
                layout.$forceUpdate()
            },

            getMountNode() {
                return layout && layout.$refs.$$mount
            },
        })
    }
}
