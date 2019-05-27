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
    mock: {
      title: 'HelloWorld'
    }
  },
  docker: {
    tag: 'rdebase/rdc-nut:0.0.1-beta.1',
    ports: [
      '8080:8080'
    ]
  },
  exportFiles: [
    'src/pages',
    '__mock__'
  ],
  lint: {
    files: [
      'src/**/*.js',
      'src/**/*.vue'
    ]
  }
}
