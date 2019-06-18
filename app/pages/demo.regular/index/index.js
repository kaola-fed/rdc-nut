import ListComponent from '~/regular/ListComponent.js'
import { KLNotify } from 'nek-ui';

import template from './index.html';
import './index.scss';

import { API } from './api';

export default ListComponent.extend({
    template,
    url: '/api/regular/demo/list',
    config(data) {
        this.defaults({});
        this.supr(data);
    },
    xdrOption() {
        return { method: 'POST' };
    },
    async onExport() {
        try {
            await API.exportList(this.getExtraParam());
            KLNotify.success('导出成功');
        } catch (err) {
            console.error(err);
        }
    }
});
