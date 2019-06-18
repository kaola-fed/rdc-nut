/* BaseComponent */
import {
    install
} from 'nek-ui';

import Regular from 'regularjs';
import BaseMixin from './_mixin.js';
import nutifyRegular from './nutifyRegular';

const BaseComponent = Regular.extend({
    config(data) {
        this.supr(data);
    }

}).use(BaseMixin);

install(BaseComponent);

nutifyRegular(BaseComponent);

export default BaseComponent;
