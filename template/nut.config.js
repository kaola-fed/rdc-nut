const path = require('path');
const fs = require('fs');

const SentryCliPlugin = require('@kaola/sentry-webpack-plugin');
const rm = require('rimraf');
const webpack = require('webpack');

const mock = require('./dev-mock');


const gitVersionPath = path.resolve(__dirname, '..', 'app', '.gitversion');
let gitVersion = '';
try {
    gitVersion = fs.readFileSync(gitVersionPath, {
        encoding: 'utf-8'
    });
    fs.unlinkSync(gitVersionPath);
} catch (err) {
    gitVersion = '';
}

const APP_ENV = process.env.app_env;
const IS_ONLINE = /^(pre|prod)$/.test(APP_ENV);
const APP_GIT_VERSION = IS_ONLINE ? `${APP_ENV}-${gitVersion}` : '';


const resolve = (pathname) => {
    return path.resolve(__dirname, pathname)
};

const distDir = resolve('../app/dist');

module.exports = {
    host: '0.0.0.0',
    port: '///port///' || 8080,
    layout: '///layout///' || 'kaola-advanced',
    plugins: {
        'kaola-advanced': {
            path: require.resolve('./layout/kaola.advanced'),
            enable: true
        },
        'kaola-basic': {
            path: require.resolve('./layout/kaola.basic'),
            enable: true
        },
        'common-pages': {
            path: require.resolve('./plugins/common.pages'),
            enable: true
        }
    },
    router: {
        mode: 'history'
    },
    html: {
        template: resolve('layout/index.html'),
        title: '///head.title///' || '网易考拉',
        favicon: resolve('layout/favicon.ico')
    },
    devServer: {
        before: function(app, server) {
            const isProxy = process.argv[2];
            if (isProxy) {
                return;
            }
            mock(app);
        },
        proxy: {
            ///#proxy///
            '///{prefix}///': '///{target}///',
            ////proxy///
        }
    },
    configureWebpack: {
        output: {
            path: distDir
        },
        resolve: {
            alias: {
                vue$: 'vue/dist/vue.esm.js',
                '~': resolve('base')
            }
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: [
                        /node_modules/,
                        resolve('layout/index.html')
                    ],
                    use: [{
                        loader: 'html-loader'
                    }]
                },
                {
                    test: /\.(js|vue)$/,
                    enforce: 'pre',
                    exclude: [
                        /node_modules/,
                    ],
                    use: [{
                        loader: 'eslint-loader'
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
                                    resolve('styles/mixins/index.scss'),
                                    resolve('styles/var.scss')
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
        if (IS_ONLINE) {
            ///^sentry.disable///
            config.plugin('sentry-cli-plugin')
            .use(
                new SentryCliPlugin({
                    release: APP_GIT_VERSION,
                    include: distDir, // 上传文件所在目录
                    ignore: ['node_modules', 'chunk-vendors.*'], // 不需要上传的文件，一般大文件也避免上传
                    configFile: './.sentrycli.rc', // 包含组织、项目、auth信息
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
}
