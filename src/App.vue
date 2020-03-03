<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {}
  }
}
</script>
<style lang="less">
  #app {
    position: relative;
    color: #2c3e50;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  h1,
  h2 {
    font-weight: normal;
    margin: 0;
    padding: 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: inline-block;
  }

  a {
    color: #42b983;
  }

  .clearfix::after {
    position: absolute;
    content: '';
    display: block;
    overflow: hidden;
    clear: both;
    zoom: 1;
  }

</style>
