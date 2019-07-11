/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('./nut/config/webpack');

const resolve = (pathname) => path.resolve(__dirname, pathname);

module.exports = {
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
        }
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
