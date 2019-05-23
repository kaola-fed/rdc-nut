module.exports = {
  framework: 'vue',
  docs: {
    url: 'https://rdepro.github.io/rdc-nut/'
  },
  render: {
    includes: [
      '.html',
      '.js'
    ],
    dev: {
      render: {
        suites: [
          {
            name: 'sc-common-vue',
            version: '1.0',
            alias: 'scCommonVue'
          }
        ],
        title: 'Hello World'
      }
    }
  },
  mappings: [
    {
      from: 'app',
      to: 'src'
    }
  ],
  docker: {
    tag: 'rdebase/rdc-nut:0.0.1-alpha.2',
    ports: [
      '8080:8080'
    ]
  },
  lint: {
    files: [
      'app/**/*.js',
      'app/**/*.vue',
      'runtime/**/*.js',
      'runtime/**/*.vue',
    ]
  }
}
