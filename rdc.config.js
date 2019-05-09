module.exports = {
    framework: 'vue',
    docs: {
        url: 'https://rdepro.github.io/rdc-vue-starter/'
    },
    render: {
        includes: ['.html', '.js'],
        mock: {
            title: 'Hello World'
        },
        dev: {
            render: {
                suites: [
                    {
                        name: 'sc-common-vue',
                        version: '1.0',
                        alias: 'scCommonVue'
                    }
                ],
            }
        }
    },
    mappings: [
        { from: 'app/App.vue', to: 'src/App.vue' },
        { from: 'app/components', to: 'src/components' },
    ],
    docker: {
        tag: 'rdebase/rdc-vue-starter:0.0.1-alpha.5',
        ports: ['8080:8080']
    }
};