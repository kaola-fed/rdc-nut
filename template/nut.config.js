const path = require('path');
const mock = require('./mock');

module.exports = {
    zh: '考拉前端',
    en: 'NUT PROJECT',
    host: '0.0.0.0',
    port: 8080,
    layout: 'kaolafed',
    plugins: {
        kaolafed: {
            path: require.resolve('./layout/kaolafed'),
            enable: true
        }
    },
    sidebar: [
        {
            icon: '',
            title: '菜单',
            children: [
                {
                    title: 'regular demo',
                    path: 'pages/regular/demo/index'
                },
                {
                    title: 'vue demo',
                    path: 'pages/vue/demo/index/index'
                }
            ]
        }
    ],
    devServer: {
        before: function(app, server) {
            const isProxy = process.argv[2];
            if (isProxy) {
                return;
            }
            mock(app);
        },
        proxy: {
            '/api': 'http://127.0.0.1:7000'
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@@': path.resolve(__dirname, 'layout/kaolafed/common')
            }
        },
        module: {
            rules: [
                {
                    test: /\.html$/,
                    exclude: [/node_modules/],
                    use: [{
                        loader: 'html-loader'
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
                                    path.resolve(__dirname, 'layout/kaolafed/styles/mixins/index.scss'),
                                    path.resolve(__dirname, 'layout/kaolafed/styles/var.scss')
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
}
