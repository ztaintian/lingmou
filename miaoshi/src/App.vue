<template>
  <div id="app">
    <router-view :key="key" />
  </div>
</template>

<script>
export default {
  name: 'app',
	computed: {
    key() {
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 	}
}
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';
  @import './styles/index.scss';
</style>
