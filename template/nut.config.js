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
    ...webpack,
};

if (nutConfig.babel) {
    config.babel = nutConfig.babel;
}

module.exports = config;
