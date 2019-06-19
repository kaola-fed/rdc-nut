import { Component, Mixins } from 'vue-property-decorator';
import { ListMixin, SelectMixin, AuthMixin } from 'rds-vue';
import ActionMixin from './mixins/list.action';

@Component
export default class Index extends Mixins(ListMixin, SelectMixin, ActionMixin, AuthMixin) {
    private condition = {
        department: '',
        shopId: '',
        commerceType: ''
    }
    private sourceKeys = ['department', 'shopList', 'commerceType']
}
