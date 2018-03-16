<template>
  <div id="demo">
    <demo1 v-if="$route.params.id === 1"></demo1>
    <demo2 v-if="$route.params.id === 2"></demo2>
    <demo3 v-if="$route.params.id === 3"></demo3>
  </div>
</template>

<script>
import Demo1 from './demo1'
import Demo2 from './demo2'
import Demo3 from './demo3'

export default {
  components: {
    Demo1,
    Demo2,
    Demo3
  }
}
</script>
