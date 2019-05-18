import 'element-kaola/index.scss';
import 'nek-ui/dist/css/nek-ui.default.min.css';
import './styles/index.scss';

import './app';

import BaseComponent from './common/base/BaseComponent';
import template from './index.html';

const Layout = BaseComponent.extend({
    template,

    computed: {
        currentPages() {
            return this.getCurrentPages()
        },
    },

    getActivePage(pages) {
        return pages.find(page => page.active) || {}
    },

    getCurrentPages() {
        if (!this.data.ctx) {
            return []
        }

        const sidebar = this.data.ctx.api.sidebar.get()
        const found = sidebar.find(s => s.active)

        if (!found) {
            return []
        }

        return found.children || []
    },

    onLogout() {
        this.$emit('logout')
    },

    config(data) {
        this.data.collapsed = localStorage.getItem('_nut_layout_kaola_collapsed')
        data.menus = [{
            title: '首页',
            open: true,
            iconClass: 'icon icon-home',
            children: [
            {
                title: 'regular Demo',
                url: '/#/pages/regular/demo/index',
                open: true
            }, {
                title: 'vue Demo',
                url: '/#/pages/vue/demo/index/index'
            }]
        }, {
            title: '文档',
            children: [{
                title: 'bar',
                url: '/#/pages/bar'
            }]
        }, ]
    },
})

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
