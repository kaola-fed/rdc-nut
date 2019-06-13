import Vue from 'vue';
import ElementUI from 'element-ui';
import ElementUIVerify from 'element-ui-verify';

import { Components, Filters, Directives } from '~/vue/index';

Vue.use(ElementUI);
Vue.use(ElementUIVerify);

Vue.use(Components);
Vue.use(Filters);
Vue.use(Directives);
