import 'element-kaola/index.scss';
import 'nek-ui/dist/css/nek-ui.default.min.css';
import '../../styles/index.scss';

import Vue from 'vue';
import SiteNavLayout from '@kaola-sc/scm-layout';

import { API } from '../common/api';
import _ from '~/widget/util';

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
                // 背景水印
                window.feedback && window.feedback('nickname');
            } catch (err) {
                this.$emit('requestError', err);
            }
        },

        async getMenus() {
            try {
                const { result } = await API.getMenus();
                this.menus = result && result.list || [];
            } catch (err) {
                this.$emit('requestError', err);
            }
        },

        async getFavorMenus() {
            try {
                const { result } = await API.getFavorMenus();
                this.favoriteMenus = result.list || [];
            } catch(err) {
                this.$emit('requestError', err);
            }
        },


        async handleLogout() {
            try {
                await API.logout();
                this.$emit('logout');
            } catch (err) {
                this.$emit('requestError', err);
            }
        },
        async handleSorted(e) {
            try {
                await API.sortFavorMenus({menus: e});
                this.favoriteMenus = e;
            } catch(err) {
                this.$emit('requestError', err);
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
            } catch(err) {
                this.$emit('requestError', err);
            }

        },
        handlePageChange(url) {
            window.location.href = url;
            // this.ctx.api.router.push(url);
        }
    },
    template
});

