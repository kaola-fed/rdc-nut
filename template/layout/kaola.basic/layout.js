import 'element-kaola/index.scss';
import 'nek-ui/dist/css/nek-ui.default.min.css';
import './layout.scss';
import '../../styles/index.scss';

import BaseComponent from '~/regular/BaseComponent';
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

export default BaseComponent.extend({
    template,

    config(data) {
        this.defaults({
            isHideLayout: getUrlParam('isHideLayout')
        });
        this.supr(data);
    },

    init() {
        this.supr();
        this.getUserInfo();
        this.getMenus();
    },

    async getUserInfo() {
        try {
            const { result } = await API.getUserInfo();
            window.userInfo = result && result.userInfo || {};
            this.data.userInfo = window.userInfo;
            // 背景水印
            window.feedback && window.feedback('nickname');
        } catch (err) {
            this.$emit('requestError', err);
        }
    },

    async fetchMenus() {
        try {
            const { result } = await API.getMenus();
            return result && result.list || [];
        } catch (err) {
            this.$emit('requestError', err);
        }
    },

    async getMenus() {
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
