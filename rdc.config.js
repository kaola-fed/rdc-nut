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
    mock: {
      title: 'Hello World'
    }
  },
  mappings: [
    {
      from: 'app',
      to: 'src'
    }
  ],
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
