import { Component, Mixins } from 'vue-property-decorator';
import { ListMixin, SelectMixin, AuthMixin } from 'rds-vue';
import ActionMixin from './mixins/list.action';
import { API } from './api';
@Component
export default class Index extends Mixins(ListMixin, SelectMixin, ActionMixin, AuthMixin) {
    public listService = API.getList;

    public condition = {
        department: '',
        shopId: '',
        commerceType: ''
    };

    public sourceKeys = ['department', 'shopList', 'commerceType']
}
