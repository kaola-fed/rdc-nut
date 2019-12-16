/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const SentryCliPlugin = require('@kaola/sentry-webpack-plugin');
const rm = require('rimraf');
const webpack = require('webpack');

const devServer = require('./dev-server');
const getGitVersion = require('./git-version');

// eslint-disable-next-line import/no-unresolved
const variables = require('../../../.cache/rdc.variables.js');

const APP_ENV = process.env.app_env;
const IS_ONLINE = /^(pre|prod)$/.test(APP_ENV);
const APP_GIT_VERSION = getGitVersion(APP_ENV);

function getPublicPath() {
    const buildArgv = process.env.BUILD_ARGV || [];

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
    return `${cdnHost}/${gitGroup}/${gitProject}/${publicVersion}/`
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
        config.plugin('define-plugin').use(
            new webpack.DefinePlugin({
                APP_GIT_VERSION: JSON.stringify(APP_GIT_VERSION),
                IS_ONLINE,
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
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
