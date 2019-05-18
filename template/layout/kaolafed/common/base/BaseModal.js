/* BaseModal */
import { KLModal } from 'nek-ui';
import BaseMixin from './_mixin.js';
import filter from '../widget/filter.js';

import nutifyRegular from './nutifyRegular';

const BaseModal = KLModal.extend({
    config(data) {
        this.supr(data);
    }
}).use(BaseMixin).filter(filter);

nutifyRegular(BaseModal);

export default BaseModal;