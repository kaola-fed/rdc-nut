<template>
  <div>
    <h3 class="content">
      Hello World!
    </h3>
    <button @click="sayHello">
      Click me
    </button>
  </div>
</template>

<script>
export default {
  created() {
    console.log( 'created' )
  },
  methods: {
    sayHello() {
      alert( 'Hello!' )
    }
  }
}
</script>

<style lang="scss" scoped src="./foo.scss"></style>