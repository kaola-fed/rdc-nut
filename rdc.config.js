const childProcess = require('child_process');
const path = require('path');
const fs = require('fs');

// 获取 git version
let gitVersion = '';
const gitVersionPath = path.resolve(__dirname, 'app', '.gitversion');
try {
    gitVersion = childProcess.execSync('git rev-parse --short=7 HEAD', { encoding: 'utf8' }).trim();
    fs.writeFileSync(gitVersionPath, gitVersion, {
        encoding: 'utf-8'
    });
} catch (err) {
    gitVersion = fs.readFileSync(gitVersionPath, {
        encoding: 'utf-8'
    });
}

module.exports = {
    framework: 'vue',
    docs: {
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
            head: {
                title: '考拉供应链管理系统',
                styles: [
                    '//at.alicdn.com/t/font_393438_2tbubgazdlxo5hfr.css'
                ],
            },
            hubble: {
                testKey: 'MA-8FAE-2AEEAA1727B7',
                onlineKey: 'MA-B4A8-445698C8D4FE',
            },
            feedback: {
                disable: false
            },
            sentry: {
                org: 'kaolafed',
                project: 'kaola-rhea-fed',
                release: gitVersion,
                dsn: 'https://a0bd3c16c5c843e697327f8ded21ee62@sentry.kaola.com/40',
                token: '29ccec3e738b46d19fa1157f889c6ab9a0927556c1934bfa9d8460dae14a5ae4',
            },
            plugins: [
                '/install.js'
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
        ext: ['.js', '.vue']
    }
}
