import Vue from 'vue';
import { AdvancedLayout } from '@ali/scm-layout';

import { API } from '../common/api';

import template from './layout.html';

const getUrlParam = (name) => {
    const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
    const r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return r[2];
    }
    return null;
};

export default Vue.extend({
    components: {
        AdvancedLayout
    },
    data() {
        return {
            menus: [],
            userInfo: {},
            favoriteMenus: [],
            parentUrl: '',
            isHideLayout: false
        };
    },

    created() {
        this.getUserInfo();
        this.getMenus();
        this.getFavorMenus();
        this.getParentUrl();
    },

    mounted() {
        this.isHideLayout = getUrlParam('isHideLayout');
    },

    methods: {
        async getUserInfo() {
            try {
                const { result } = await API.getUserInfo();

                window.userInfo = result || {};
                this.userInfo = window.userInfo;

                if (window.DATracker && window.DATracker.login) {
                    window.DATracker.login(window.userInfo.nickName || window.userInfo.nickname);
                }

                // 背景水印
                if (!this.isHideLayout) {
                    window.feedback && window.feedback('nickname');
                }
            } catch (err) {
                console.error(err);
            }
        },

        async getMenus() {
            try {
                const { result } = await API.getMenus();
                this.menus = result && result.list || [];
            } catch (err) {
                console.error(err);
            }
        },

        async getFavorMenus() {
            try {
                const { result } = await API.getFavorMenus();
                this.favoriteMenus = result.list || [];
            } catch(err) {
                console.error(err);
            }
        },

        async getParentUrl() {
            try {
                const { result } = await API.getParentUrl({
                    url: window.location.pathname
                });
                this.parentUrl = result && result.url;
            } catch (err) {
                console.error(err);
            }
        },


        async handleLogout() {
            this.$ctx.events.emit('layout:logout');
        },
        async handleSorted(e) {
            try {
                await API.sortFavorMenus({ menus: e });
                this.favoriteMenus = e;
            } catch(err) {
                console.error(err);
            }
        },

        async handleFavored(e) {
            try {
                if(e.favored) {
                    await API.addFavorMenus(e.page);
                    this.favoriteMenus.push(e.page);
                } else {
                    await API.removeFavorMenus(e.page);
                    const index = this.favoriteMenus.findIndex((menu) => {
                        return menu.url === e.page.url;
                    });
                    if(index !== -1) {
                        this.favoriteMenus.splice(index, 1);
                    }
                }
            } catch(err) {
                console.error(err);
            }

        },
        handlePageChange(url) {
            window.location.href = url;
            // this.$ctx.api.router.push(url);
        }
    },
    template
});

