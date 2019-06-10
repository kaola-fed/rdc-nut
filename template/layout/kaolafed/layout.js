import 'element-kaola/index.scss';
import 'nek-ui/dist/css/nek-ui.default.min.css';
import './styles/index.scss';

import Vue from 'vue';

import { API, goLogin } from './common/api';
import SiteNavLayout from '@kaola-sc/scm-layout';

import template from './layout.html';

export default Vue.extend({
    components: {
        SiteNavLayout
    },
    data() {
        return {
            menus: [],
            userInfo: {},
            favoriteMenus: []
        }
    },

    computed:{
        parentUrl() {
            return window.location.pathname;
        }
    },

    created() {
        this.setUserInfo();
        this.setMenus();
    },

    methods: {
        async setUserInfo() {
            try {
                const { result } = await API.getUserInfo();

                this.userInfo = result && result.userInfo || {};
            } catch (err) {
                console.log(err);
            }
        },

        async fetchMenus() {
            try {
                const { result } = await API.getMenus();
                return result && result.list || [];
            } catch (err) {
                console.log(err);
            }
        },

        async setMenus() {
            const menus = await this.fetchMenus();
            const currentPage = location.hash;

            menus.forEach(menu => {
                const matchedItem = menu.children.find(item => item.url.includes(currentPage));
                if (matchedItem) {
                    matchedItem.open = true;
                    menu.open = true;
                }
            });

            this.menus = menus;
            this.$forceUpdate();
        },

        async handleLogout() {
            try {
                await API.logout();
                goLogin();
            } catch (err) {
                console.log(err);
            }
        },
        handleSorted() {
            console.log('handleSorted');
        },
        handleFavored() {
            console.log('handle favored');
        },
        handlePageChange(url) {
            window.location.href = url;
        }
    },
    template
});

