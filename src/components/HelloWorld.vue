<template>
  <div class="hello">
    <router-link v-for="i in 3" :key="i" :to="{name: 'demo', params: {id: i}}">Demo{{i}}</router-link>
    <router-view class="demo-main"></router-view>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  padding: 1em;
}

.demo-main {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  position: relative;
}
</style>
