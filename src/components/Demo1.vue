<template>
  <div id="demo1">
    <button @click="open = !open">Toggle</button>
    <Spring :endValue="{val: open ? 400 : 0}">
      <div slot-scope="val" class="demo1">
        <div  class="demo1-block" @click="console(val)" :style="{transform: `translate3d(${val.val}px, 0, 0)`}">
        </div>
      </div>
    </Spring>
  </div>
</template>

<script>
import Spring from './Spring'

export default {
  data () {
    return {
      open: false
    }
  },
  components: {
    Spring
  },
  methods: {
    console (...args) {
      console.log(...args)
    }
  }
}
</script>

<style>
  .demo1 {
    border-radius: 4px;
    background-color: rgb(240, 240, 232);
    position: relative;
    margin: 5px 3px 10px;
    width: 450px;
    height: 50px;
  }
  .demo1-block {
    position: absolute;
    width: 50px;
    height: 50px;
    border-radius: 4px;
    background-color: rgb(130, 181, 198);
  }
</style>
