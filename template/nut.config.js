/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('./nut/config/webpack');

// eslint-disable-next-line import/no-unresolved
const variables = require('../.cache/rdc.variables.js');

const resolve = (pathname) => path.resolve(__dirname, pathname);

const nutConfig = variables.nut || {};

const config = {
    host: '0.0.0.0',
    port: '///port///' || 8080,
    layout: '///layout///' || 'kaola-advanced',
    plugins: {
        'kaola-advanced': {
            path: require.resolve('./nut/plugins/layout/kaola-advanced'),
        },
        'kaola-basic': {
            path: require.resolve('./nut/plugins/layout/kaola-basic'),
        },
        'common-pages': {
            path: require.resolve('./nut/plugins/common-pages'),
        },
        ...nutConfig.plugins,
    },
    router: {
        mode: 'history',
        defaultCacheable: false
    },
    html: {
        template: resolve('nut/template.html'),
        title: '///head.title///' || '网易考拉',
        favicon: resolve('nut/favicon.ico')
    },
    hooks: {
        filterPage({ page }) {
            // modals、modules、components、mixins、common、_common、api 不生成路由
            if (/\/(modals|modules|mixins|components|common|_common)\//.test(page)) {
                return false;
            }
            // api.js、api.ts 不生成路由
            if (/\/api$/.test(page)) {
                return false;
            }
            return true;
        }
    },
    ...webpack,
};

if (nutConfig.babel) {
    config.babel = nutConfig.babel;
}

module.exports = config;
