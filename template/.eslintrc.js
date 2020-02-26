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
            alias: {
                map: [
                    ['vue$', 'vue/dist/vue.esm.js'],
                    ['~', resolve('src/base')],
                    ['app', resolve('../app')],
                ],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
            }
        },
    },
    extends: [
        'plugin:vue/essential',
        'airbnb-base',
        'typescript',
        'plugin:@ali/common-rules/recommended',
    ],
    rules: {
        'quotes': ['error', 'single'],
        'prefer-const': ['error', {'destructuring': 'all'}],
        'no-var': ['error'],
        'prefer-arrow-callback': ['error'],
        'no-plusplus': 0,
        'class-methods-use-this': 0,
        'no-underscore-dangle': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-unresolved': [
            'error',
            {
                ignore: ['~/'],
            },
        ],
        'import/extensions': [0],
        'import/prefer-default-export': [0],
        'no-console': ['error', { allow: ['warn', 'error'] }],
        'semi': ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-member-accessibility': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-ts-ignore': 0,
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
    }
};
