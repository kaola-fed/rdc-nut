/* BaseModal */
import { KLModal } from 'nek-ui';
import BaseMixin from './_mixin.js';

import nutifyRegular from './nutifyRegular';

const BaseModal = KLModal.extend({
    config(data) {
        this.supr(data);
    }
}).use(BaseMixin);

nutifyRegular(BaseModal);

export default BaseModal;
