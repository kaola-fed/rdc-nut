import 'element-kaola/index.scss';
import 'nek-ui/dist/css/nek-ui.default.min.css';
import '../styles/index.scss';

import Vue from 'vue';
import SiteNavLayout from '@kaola-sc/scm-layout';

import { API, goLogin } from '../common/api';
import _ from '../common/widget/util';

import template from './layout.html';

export default Vue.extend({
    components: {
        SiteNavLayout
    },
    data() {
        return {
            menus: [],
            userInfo: {},
            favoriteMenus: [],
            isHideLayout: true
        }
    },

    computed:{
        parentUrl() {
            return window.location.pathname;
        }
    },

    created() {
        this.getUserInfo();
        this.getMenus();
        this.getFavorMenus();
    },
    mounted() {
        this.isHideLayout = _.getUrlParam('isHideLayout');
    },

    methods: {
        async getUserInfo() {
            try {
                const { result } = await API.getUserInfo();

                this.userInfo = result && result.userInfo || {};
            } catch (err) {
                console.log(err);
            }
        },

        async getMenus() {
            try {
                const { result } = await API.getMenus();
                this.menus = result && result.list || [];
            } catch (err) {
                console.log(err);
            }
        },

        async getFavorMenus() {
            try {
                const { result } = await API.getFavorMenus();
                this.favoriteMenus = result.list || [];
            } catch(e) {
                console.log(e);
            }
        },


        async handleLogout() {
            try {
                await API.logout();
                goLogin();
            } catch (err) {
                console.log(err);
            }
        },
        async handleSorted(e) {
            try {
                await API.sortFavorMenus({menus: e});
                this.favoriteMenus = e;
            } catch(e) {
                console.log(e);
            }
        },

        async handleFavored(e) {
            try {
                if(e.favored) {
                    await API.addFavorMenu(e.page);
                    this.favoriteMenus.push(e.page);
                } else {
                    await API.removeFavorMenu(e.page);
                    let index = this.favoriteMenus.findIndex(function(menu) {
                        return menu.url === e.page.url;
                    });
                    if(index !== -1) {
                        this.favoriteMenus.splice(index, 1);
                    }
                }
            } catch(e) {
                console.log(e);
            }

        },
        handlePageChange(url) {
            window.location.href = url;
            // this.ctx.api.router.push(url);
        }
    },
    template
});

