import './vue.entry';

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

                    layout = new Layout({
                        data: {
                            ctx
                        }
                    })

                    layout.$on('logout', () => {
                        ctx.events.emit('layout:logout')
                    })
                }

                layout.$inject(node)
            },

            unmount(node) {
                if (!layout) {
                    return
                }

                layout.$inject(false)
            },

            update(data = {}) {
                if (!layout) {
                    return
                }

                layout.data.ctx = data.ctx
                layout.$update()
            },

            getMountNode() {
                return layout && layout.$refs.$$mount
            },
        })
    }
}
