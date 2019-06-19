/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const resolve = (pathname) => {
    return path.resolve(__dirname, pathname);
};

module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts'],
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '~': resolve('base')
        }
    }
};
