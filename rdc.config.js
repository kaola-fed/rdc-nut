module.exports = {
    framework: 'vue',
    docs: {
        url: 'https://rdepro.github.io/rdc-vue-starter/'
    },
    render: {
        includes: ['.html'],
        mock: {
            title: 'Hello World'
        }
    },
    mappings: [
        { from: 'app/App.vue', to: 'src/App.vue' },
        { from: 'app/components', to: 'src/components' },
    ],
    docker: {
        tag: 'rdebase/rdc-vue-starter:0.0.1-alpha.1',
        ports: ['8080:8080']
    },
};