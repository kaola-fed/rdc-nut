module.exports = {
    "root": true,
    "extends": [
        "plugin:vue/recommended"
    ],
    "parserOptions": {
        "parser": "babel-eslint",
        "sourceType": "module"
    },
    "env": {
        "browser": true
    },
    "rules": {
        // 禁止修改 const 声明的变量
        'no-const-assign': 'error',
        // --fix: 要求使用 let 或 const，禁止使用 var
        'no-var': 'error',
    }
};
