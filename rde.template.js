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
            ProjectName: 'Hello World'
        }
    },
    mappings: [
        { from: 'app/views', to: 'src/views' },
        { from: 'app/router.js', to: 'src/router.js' },
        { from: 'app/store.js', to: 'src/store.js' },
    ],
};