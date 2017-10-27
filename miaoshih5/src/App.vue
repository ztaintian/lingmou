<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
 @import '~normalize.css/normalize.css';
 body,html,#app{
 	height:100%;
 	width:100%;
 }
</style>
