/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const SentryCliPlugin = require('@kaola/sentry-webpack-plugin');
const PorgressBarPlugin = require('progress-bar-webpack-plugin');
const rm = require('rimraf');
const chalk = require('chalk');
const webpack = require('webpack');

const devServer = require('./dev-server');
const getGitVersion = require('./git-version');

// eslint-disable-next-line import/no-unresolved
const variables = require('../../../.cache/rdc.variables.js');

const APP_ENV = process.env.app_env;
const IS_ONLINE = /^(pre|prod)$/.test(APP_ENV);
const APP_GIT_VERSION = getGitVersion(APP_ENV);

const resolve = (pathname) => path.resolve(__dirname, '../../', pathname);
const distDir = resolve('../app/dist');
const publicPath = process.env.NODE_ENV === 'development' ? '/' : '///{build.publicPath}///' || '/public/';

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

        if (IS_ONLINE) {
            ///^sentry.disable///
            config.plugin('sentry-cli-plugin')
                .use(
                    new SentryCliPlugin({
                        release: APP_GIT_VERSION,
                        include: distDir, // 上传文件所在目录
                        ignore: ['node_modules', 'chunk-vendors.*'], // 不需要上传的文件，一般大文件也避免上传
                        configFile: resolve('.sentrycli.rc'), // 包含组织、项目、auth信息
                        urlPrefix: '', // 根据include的设置、以及实际访问路径调整，urlPrefix与include结合后与实际访问路径匹配即可
                        afterUpload: (resolve, reject) => {
                            // 上传完成后删除sourcemap，避免源码泄漏
                            const p = path.join(distDir, '*.?(css|js).map');
                            rm(p, (err) => {
                                if (err) {
                                    return reject(err);
                                }
                                resolve();
                            });
                        }
                    })
                );
            ////sentry.disable///
        }
    }
};
