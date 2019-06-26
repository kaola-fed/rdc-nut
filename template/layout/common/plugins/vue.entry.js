import Vue from 'vue';
import ElementUIVerify from 'element-ui-verify';

import RdsVue from 'rds-vue';

import 'rds-vue/dist/rdsvue.css';

RdsVue.install(Vue, {
    ///#rdsVue///
    ///{key}///: ///{value}///,
    ////rdsVue///
});

Vue.use(ElementUIVerify);
