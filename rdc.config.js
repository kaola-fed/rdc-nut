const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

// 获取 git version
const gitVersionPath = path.resolve(process.cwd(), 'app', '.gitversion');
try {
    const gitVersion = childProcess.execSync('git rev-parse --short=7 HEAD', { encoding: 'utf8' }).trim();
    fs.writeFileSync(gitVersionPath, gitVersion, {
        encoding: 'utf-8'
    });
} catch (err) {
    console.log('');
}

module.exports = {
    framework: 'vue',
    docs: {
        // url: '/'
        url: 'https://kaola-fed.github.io/rdc-nut/'
    },
    render: {
        includes: [
            '.html',
            '.js',
            '.rc' // .sentrycli.rc
        ],
        tags: ["///", "///"],
        mock: {
            port: 8080,
            layout: 'kaola-advanced',
            head: {
                title: '考拉供应链管理系统',
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
            proxy: {
                host: 'ms.kaola.com',
                rules: [
                    {
                        prefix: '/api,/sc-workdesk',
                        target: 'http://10.198.172.253:8009'
                    },
                    {
                        prefix: '/sc-test',
                    },
                ]
            },
            plugins: [],
            rdsVue: [
                {
                    key: 'authUrl', value: '"/api/common/auth"'
                },
                {
                    key: 'selectUrl', value: `function() {
                        return '/api/regular/selectList';
                    }`
                }
            ]
        }
    },
    mappings: [{
        from: 'app',
        to: 'src'
    }],
    docker: {
        tag: 'rdebase/rdc-nut:0.0.1-alpha.4',
        ports: [
            '8080:8080'
        ]
    },
    lint: {
        ext: ['.js', '.vue', '.ts']
    }
};
