/* BaseComponent */
import {
    install
} from 'nek-ui';
import 'nek-ui/dist/css/nek-ui.default.min.css';

import Regular from 'regularjs';
import BaseMixin from './_mixin.js';
import filter from '../widget/filter.js';
import nutifyRegular from './nutifyRegular';

const BaseComponent = Regular.extend({
    config(data) {
        this.supr(data);
    }

}).use(BaseMixin).filter(filter);

install(BaseComponent);

nutifyRegular(BaseComponent);

export default BaseComponent;
