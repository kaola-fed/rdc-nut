module.exports = {
    useLocal: true,
    framework: 'vue',
    mappings: [{
        from: 'app',
        to: 'src',
    }],
    npm: {
        name: 'rdc-nut',
        version: '0.0.1-beta.5',
    },
    lint: {
        ext: ['.js', '.vue', '.ts']
    },
    docs: {
        url: 'https://kaola-fed.github.io/rdc-nut/'
    },
    render: {
        includes: [
            '.html',
            '.js',
            '.ts',
            // .sentrycli.rc
            '.rc'
        ],
        tags: ['///', '///'],
        mock: {
            port: 8080,
            layout: 'kaola-basic',
            head: {
                title: '供应链管理系统',
                styles: [
                    '//at.alicdn.com/t/font_393438_2tbubgazdlxo5hfr.css'
                ],
            },
            api: {
                // getUserInfo: '/sc-workdesk/api/userInfo',
                // getMenus: '/sc-workdesk/api/menu/left'
            },
            hubble: {
                testKey: 'MA-8FAE-2AEEAA1727B7',
                onlineKey: 'MA-B4A8-445698C8D4FE',
            },
            feedback: {
                disable: false
            },
            build: {
                publicPath: '/public/'
            },
            sentry: {
                org: 'kaolafed',
                project: 'kaola-rhea-fed',
                dsn: 'https://a0bd3c16c5c843e697327f8ded21ee62@sentry.kaola.com/40',
                token: '29ccec3e738b46d19fa1157f889c6ab9a0927556c1934bfa9d8460dae14a5ae4',
            },
            rdsVue: {
                disable: true
            }
        }
    },
    variables: {
        nut: {
            babel: {
                transpileModules: [],
            },
            chainWebpack: (config) => {

            },
            plugins: {
                'kaola-custom': {
                    // path: require.resolve('./nut/plugins/layout/kaola-advanced'),
                },
            }
        },
        proxy: {
            host: 'ms.kaola.com',
            rules: [
                {
                    prefix: ['/api', '/sc-workdesk'],
                }
            ]
        },
        request: {
            handleRequestError: (res) => {
                if(res && res.code === 10000 || res.code === 10007 || res.retcode === 10007) {
                    location.href = `/api/login?redirect=${encodeURIComponent(window.location.href)}`;
                } else if (res && res.code === 403) {
                    location.href = 'pages/unauthorized/index@common-pages';
                } else {
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    const { KLModal } = require('nek-ui');
                    KLModal.alert((res && res.message) || '返回异常');
                }
            }
        },
        rdsVue: {
            authUrl: '/api/common/auth',
            selectUrl: () => {
                return '/api/selectList';
            }
        }
    },
};
