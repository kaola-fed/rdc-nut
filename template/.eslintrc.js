/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const resolve = (pathname) => {
    return path.resolve(__dirname, pathname)
};


module.exports = {
    root: true,
    env: {
        browser: true,
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
            },
            webpack: {
                config: resolve('webpack.config.js'),
            }
        },
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
        'typescript',
    ],
    rules: {
        'class-methods-use-this': 0,
        'no-underscore-dangle': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': [
            'error',
            {
                ignore: ['@/'],
            },
        ],
        'import/extensions': [0],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        "@typescript-eslint/explicit-function-return-type": 0,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    }
};
