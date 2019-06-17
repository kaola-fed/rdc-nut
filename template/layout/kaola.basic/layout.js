import 'element-kaola/index.scss';
import 'nek-ui/dist/css/nek-ui.default.min.css';
import './layout.scss';
import '../../styles/index.scss';

import BaseComponent from '~/regular/BaseComponent';
import { API } from '../common/api';
import _ from '~/widget/util';

import template from './layout.html';

export default BaseComponent.extend({
    template,

    config(data) {
        this.defaults({
            isHideLayout: _.getUrlParam('isHideLayout')
        });
        this.supr(data);
    },

    init() {
        this.supr();
        this.setUserInfo();
        this.setMenus();
    },

    async setUserInfo() {
        try {
            const { result } = await API.getUserInfo();

            this.data.userInfo = result && result.userInfo || {};
            // 背景水印
            window.feedback && window.feedback('nickname');
        } catch (err) {
            console.error(err);
        }
    },

    async fetchMenus() {
        try {
            const { result } = await API.getMenus();
            return result && result.list || [];
        } catch (err) {
            console.error(err);
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

        this.data.menus = menus;
        this.$update();
    },

    async onLogout() {
        try {
            await API.logout();
            this.$emit('logout');
        } catch (err) {
            console.error(err);
        }
    }
});
