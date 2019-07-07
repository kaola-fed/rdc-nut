import Vue from 'vue';
import ElementUIVerify from 'element-ui-verify';
import RdsVue from 'rds-vue';

///^hubble.disable///
import './hubble';
////hubble.disable///

///^sentry.disable///
import './sentry';
////sentry.disable///


// eslint-disable-next-line import/no-unresolved
import variables from '../../rdc.variables';

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import entryFn from './entry';

import 'nek-ui/dist/css/nek-ui.default.min.css';
import 'rds-vue/dist/rdsvue.css';
import './styles/index.scss';


export default async ctx => {
    entryFn(ctx);

    RdsVue.install(Vue, variables.rdsVue || {
        selectUrl: () => '/api/selects',
        resolveCommonReturn: json => json.result,
        authUrl: '/api/auth',
    });

    Vue.use(ElementUIVerify);
};
