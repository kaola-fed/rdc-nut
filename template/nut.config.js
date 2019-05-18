const path = require('path');
const mock = require('./mock');

console.log(path.resolve(__dirname, 'layout/style/mixins/index.scss'));

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
    sidebar: [{
            icon: '',
            title: '菜单',
            children: [{
                    title: 'foo',
                    path: 'pages/foo'
                },
                {
                    title: 'bar',
                    path: 'pages/bar'
                },
                {
                    title: 'regular',
                    path: 'pages/regular'
                },
            ]
        },

        {
            icon: '',
            title: 'GitHub',
            link: 'https://github.com/fengzilong/nut'
        },
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
                                    path.resolve(__dirname, 'layout/style/mixins/index.scss'),
                                    path.resolve(__dirname, 'layout/style/var.scss')
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    }
}
