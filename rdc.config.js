module.exports = {
    framework: 'vue',
    docs: {
        url: 'https://kaola-fed.github.io/rdc-nut/'
    },
    render: {
        includes: [
            '.html',
            '.js'
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
                enable: true,
                testKey: 'MA-8FAE-2AEEAA1727B7',
                onlineKey: 'MA-B4A8-445698C8D4FE',
            },
            feedback: {
                enable: true
            }
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
