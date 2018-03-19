<template>
  <div id="demo2">
    <Spring ref="spring" :endValue="getValues">
      <div slot-scope="value" class="demo2" @mousemove="handleMouseMove">
        <div v-for="(v, i) in value.val" :key="i" :class="`demo2-ball ball-${i}`"
          :style="{zIndex: value.val.length - i, transform: `translate3d(${v[0] - 25}px, ${v[1] - 25}px, 0)`}"></div>
      </div>
    </Spring>
  </div>
</template>

<script>
import { range } from '../utils'
import Spring from './Spring'

export default {
  data () {
    return {
      mouse: [250, 300]
    }
  },
  methods: {
    getValues (currentPositions) {
    // currentPositions of `null` means it's the first render for Spring
      if (currentPositions == null) {
        return {val: range(6).map(() => [0, 0])}
      }
      const endValue = currentPositions.val.map((_, i) => {
      // hack. We're getting the currentPositions of the previous ball, but in
      // reality it's not really the "current" position. It's the last render's.
      // If we want to get the real current position, we'd have to compute it
      // now, then read into it now. This gets very tedious with this API.
        return i === 0 ? this.mouse : currentPositions.val[i - 1]
      })
      return {val: endValue, config: [120, 17]}
    },
    handleMouseMove (e) {
      const target = e.currentTarget
      this.mouse = [e.pageX - target.offsetLeft, e.pageY - target.offsetTop - 110]
      this.$refs.spring.raf(true, false)
    }
  },
  components: {
    Spring
  }
}
</script>

<style>
    .demo2 {
      width: 500px;
      height: 600px;
      background: #f5f5f5;
    }
    .demo2-ball {
      border-radius: 99px;
      background-color: white;
      width: 50px;
      height: 50px;
      border: 3px solid white;
      position: absolute;
      background-size: 50px;
    }
    .ball-0 {
      background-color: #EF767A;
    }
    .ball-1 {
      background-color: #456990;
    }
    .ball-2 {
      background-color: #49BEAA;
    }
    .ball-3 {
      background-color: #49DCB1;
    }
    .ball-4 {
      background-color: #EEB868;
    }
    .ball-5 {
      background-color: #EF767A;
    }
</style>
