import { Component, Mixins } from 'vue-property-decorator';
import { ListMixin, SelectMixin, AuthMixin } from 'rds-vue';
import ActionMixin from './mixins/list.action';

@Component
export default class Index extends Mixins(ListMixin, SelectMixin, ActionMixin, AuthMixin) {
    condition = {
        department: '',
        shopId: '',
        commerceType: ''
    }
    sourceKeys = ['department', 'shopList', 'commerceType']
}
