// eslint-disable-next-line import/no-unresolved
/* eslint-disable @typescript-eslint/no-var-requires */
const variables = require('../../../rdc.variables.js');
const mock = require('./mock');

const proxyArgv = process.argv[2];
const gateway = {
    test: 'http://10.198.172.253:8009',
    pre: '',
    online: ''
};
const proxyTarget = gateway[proxyArgv] || gateway['test'];

if (!variables.proxy) {
    module.exports = {};
} else {
    const proxy = variables.proxy || {};
    const rules = proxy.rules || [];
    const host = proxy.host || '';

    const devServer = {
        before: (app) => {
            if (!proxyArgv) {
                mock(app);
                return;
            }
        },
    };

    if (proxyArgv) {
        devServer.proxy = rules.map(rule => {
            const prefix = rule.prefix || '';

            let context = [];
            if (prefix instanceof Array) {
                context = prefix.filter(item => !!item);
            } else {
                context = [].concat(prefix);
            }

            return {
                context,
                target: rule.target || proxyTarget,
                headers: {
                    'X-Gateway-Host': host
                }
            };
        });
    }

    module.exports = devServer;
}
