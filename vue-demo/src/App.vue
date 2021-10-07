<template>
  <div id="app">
    <HelloWorld v-if="isOpen" />
    <button @click="setIsOpen()">test</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: { HelloWorld },
  data() {
    return {
      isOpen: true,
    }
  },

  methods: {
    setIsOpen() {
      console.log(123)
      this.isOpen = !this.isOpen
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
</style>
