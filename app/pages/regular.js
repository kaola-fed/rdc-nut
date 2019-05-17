import BaseComponent from '../common/base/BaseComponent.js'

const Page =  BaseComponent.extends( {
  template: `
    <div class="stylus_test">
      page 2333 by regular test { count }
    </div>
  `,

  config() {
    this.data.count = 0;
  },

  init() {
    setInterval( () => {
      this.data.count = this.data.count + 1
      this.$update()
    }, 1000 )
  }
} )

export default Page;
