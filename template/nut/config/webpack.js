/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const PorgressBarPlugin = require('progress-bar-webpack-plugin');
const rm = require('rimraf');
const chalk = require('chalk');
const webpack = require('webpack');

const devServer = require('./dev-server');

// eslint-disable-next-line import/no-unresolved
const variables = require('../../../.cache/rdc.variables.js');

const APP_ENV = process.env.app_env;
const IS_ONLINE = /^(pre|prod)$/.test(APP_ENV);
const APP_GIT_VERSION = process.env.BUILD_GIT_COMMITID || '';

function getPublicPath() {
    const buildArgv = JSON.parse(process.env.BUILD_ARGV || '[]');

    const buildArgvMap = {};
    buildArgv.forEach(str => {
        const arr = str.split('=');

        buildArgvMap[arr[0].slice(2)] = arr[1] || '';
    });

    // cdn 区分 日常 和 线上
    // 注意：在 DEF 上开启 线上构建，否则无 def_publish_env 变量
    const cdnHost = buildArgvMap['def_publish_env'] === 'daily' ? 'https://dev.g.alicdn.com' : 'https://g.alicdn.com';

    const gitBranch = process.env.BUILD_GIT_BRANCH || '';
    // 从 git 分支名获取 前端版本号
    const publicVersion = gitBranch.split('/')[1];

    // git 分组
    const gitGroup = process.env.BUILD_GIT_GROUP || '';
    // git 工程名
    const gitProject = process.env.BUILD_GIT_PROJECT || '';

    // publicPath: cdnHost + git分组 + git工程名 + 版本号
    return `${cdnHost}/${gitGroup}/${gitProject}/${publicVersion}/`;
}

const resolve = (pathname) => path.resolve(__dirname, '../../', pathname);
const distDir = resolve('../app/dist');
const publicPath = process.env.NODE_ENV === 'development' ? '/' : getPublicPath();

// noinspection WebpackConfigHighlighting
module.exports = {
    devServer,
    configureWebpack: {
        output: {
            path: distDir,
            publicPath
        },
        resolve: {
            extensions: ['.html', '.ts', '.js', '.vue', '.json'],
            alias: {
                vue$: 'vue/dist/vue.esm.js',
                '~': resolve('src/base'),
                'app': resolve('../app')
            }
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: [
                        /node_modules/,
                        resolve('nut/template.html')
                    ],
                    use: [{
                        loader: 'html-loader'
                    }]
                },
                {
                    test: /\.(js|vue|tsx?)$/,
                    enforce: 'pre',
                    exclude: [
                        /node_modules/,
                        /nut-auto-generated-/,
                    ],
                    use: [{
                        loader: 'eslint-loader',
                        options: {
                            emitWarning: true,
                            configFile: resolve('.eslintrc.js'),
                        }
                    }]
                },
                {
                    test: /\.scss$/,
                    enforce: 'pre',
                    use: [
                        {
                            loader: 'style-resources-loader',
                            options: {
                                patterns: [
                                    resolve('src/styles/mixins/index.scss'),
                                    resolve('src/styles/var.scss')
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    },
    chainWebpack(config) {
        config.plugins.delete('webpackbar');

        config.plugin('define-plugin').use(
            new webpack.DefinePlugin({
                APP_GIT_VERSION: JSON.stringify(APP_GIT_VERSION),
                IS_ONLINE,
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            })
        );

        config.plugin('process-bar').use(
            new PorgressBarPlugin({
                format: 'build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
                clear: false
            })
        );

        const nutConfig = variables.nut || {};
        nutConfig.chainWebpack && nutConfig.chainWebpack(config);
    }
};
