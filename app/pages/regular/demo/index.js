import ListComponent from '@/common/base/ListComponent.js'
import _ from '@/common/widget/util.js';
import { KLNotify } from 'nek-ui';

import template from './index.html';

import { API } from './api';

export default ListComponent.extends({
    template: _.compressHtml(template),
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
            console.log(err);
        }
    }
});