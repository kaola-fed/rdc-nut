import Vue from 'vue';
import ElementUIVerify from 'element-ui-verify';
import RdsVue from 'rds-vue';

///^hubble.disable///
import './hubble';
////hubble.disable///

///^sentry.disable///
import './sentry';
////sentry.disable///


// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import variables from '../../rdc.variables';

import 'nek-ui/dist/css/nek-ui.default.min.css';
import 'rds-vue/dist/rdsvue.css';
import './styles/index.scss';

// entry需要放在最后， 如果工程需要覆盖上面的样式
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import entryFn from './entry';

// eslint-disable-next-line no-console
console.log(
    '\n%cINFO%cPowered by RDC—NUT%c\n',
    'background-color: #0089ff;color: #fff;padding: 2px 6px;',
    'background-color: #3c3e6f;color: #fff;padding: 2px 6px;',
    ''
);

export default async ctx => {
    entryFn(ctx);

    RdsVue.install(Vue, (variables as any).rdsVue || {
        selectUrl: () => '/api/selects',
        resolveCommonReturn: json => json.result,
        authUrl: '/api/auth',
    });

    Vue.use(ElementUIVerify);
};
