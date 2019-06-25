import { Component, Mixins } from 'vue-property-decorator';
import { SelectMixin } from 'rds-vue';

import DetailAction from './mixins/detail.action.ts';
@Component
export default class Index extends Mixins(SelectMixin, DetailAction) {
    sourceKeys = ['department', 'commerceType', 'importType', 'geoRegion', 'available', 'contractStatus']
    detail = {
        department: '',
        name: '',
        commerceType: '',
        importType: '',
        addressCode: [],
        address: '',
        disable: '',
        contractStatus: '',
        principal: '',
        phone: '',
        remark: ''
    }
    props = {
        value: 'id',
        label: 'name'
    }
}
