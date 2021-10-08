<template>
  <div id="app">
    <button @click="setIsOpen()">测试销毁destroy事件</button>
    <Waterfall v-if="isOpen" />
  </div>
</template>

<script>
import Waterfall from './components/Waterfall.vue'
export default {
  name: 'App',
  components: { Waterfall },
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
