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
            window.userInfo = result || {};
            this.data.userInfo = window.userInfo;
            // 背景水印
            if (!this.data.isHideLayout) {
                window.feedback && window.feedback('nickname');
            }
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
        this.data.ctx.events.emit('layout:logout');
    }
});
