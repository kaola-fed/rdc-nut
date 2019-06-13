import BaseComponent from '@@/regular/BaseComponent';

import template from './index.html';
import './index.less';

export default BaseComponent.extend({
    template,
    init() {
        this.supr();
    }
});
