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
        },
    },
    // "parserOptions": {
    //     "parser": "babel-eslint",
    //     "sourceType": "module"
    // },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
        '@vue/typescript',
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
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
};
