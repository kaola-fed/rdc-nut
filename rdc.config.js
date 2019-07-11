module.exports = {
    framework: 'vue',
    mappings: [{
        from: 'app',
        to: 'src',
    }],
    docker: {
        tag: 'rdebase/rdc-nut:0.0.1-alpha.7',
        ports: [
            '8080:8080',
            '3210:3210',
            '3211:3211',
        ]
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
        tags: ["///", "///"],
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
        }
    },
    variables: {
        proxy: {
            host: 'ms.kaola.com',
            rules: [
                {
                    prefix: '/api',
                    target: 'http://10.198.172.253:8009'
                },
                {
                    prefix: '/sc-workdesk',
                    target: 'http://10.198.172.253:8009'
                }
            ]
        },
        rdsVue: {
            authUrl: '/api/common/auth',
            selectUrl: () => {
                return '/api/selectList';
            }
        }
    },
};
