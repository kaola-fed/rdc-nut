module.exports = {
    framework: 'vue',
    spa: true,
    docs: {
        logo: 'https://cli.vuejs.org/favicon.png',
        keywords: ['vue-cli', 'vue-router', 'vuex']
    },
    render: {
        includes: ['.js', '.json', '.html'],
        mock: {
            name: 'Hello World'
        }
    },
    mappings: [
        { from: 'views', to: 'src/views' },
        { from: 'router.js', to: 'src/router.js' },
        { from: 'store.js', to: 'src/store.js' },
    ],
};