<template>
  <div id="demo3">
    <Spring ref="spring" :endValue="getValues">
      <div slot-scope="value" class="demo3" @mouseup="handleMouseUp" @mousemove="handleMouseMove">
        <div v-for="({val: [x, y]}, key) in value.order" :key="key" class="demo3-ball"
          @mousedown="(e) => handleMouseDown(key, [x, y], e)"
          :style="{
            backgroundColor: allColors[key],
            transform: `translate3d(${x + left}px, ${y + top}px, 0) scale(${value.scales.val[key]})`,
            zIndex: key === lastPress ? 99 : order.indexOf(key),
            boxShadow: `${(x - (3 * width - 50) / 2) / 15}px 5px 5px rgba(0,0,0,0.5)`
          }"></div>
      </div>
    </Spring>
  </div>
</template>

<script>
import { range, clamp, reinsert } from '../utils'
import Spring from './Spring'

// TODO: start at center, not upper left
const allColors = [
  '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A'
]
const [count, width, height, top, left] = [11, 70, 90, 100, 150]
// indexed by visual position
const layout = range(count).map(n => {
  const row = Math.floor(n / 3)
  const col = n % 3
  return [width * col, height * row]
})

export default {
  data () {
    return {
      mouse: [0, 0],
      delta: [0, 0],
      lastPress: null,
      isPressed: false,
      order: range(count),
      dx: 0,
      dy: 0,
      allColors,
      layout,
      left,
      top,
      width,
      count
    }
  },
  methods: {
    getValues (currentPositions) {
      const {order, lastPress, isPressed, mouse} = this
      return {
        order: order.map((_, key) => {
          if (key === lastPress && isPressed) {
            return {val: mouse, config: []}
          }
          const visualPosition = order.indexOf(key)
          return {val: layout[visualPosition], config: [120, 17]}
        }),
        scales: {
          val: range(count).map((_, key) => lastPress === key && isPressed ? 1.2 : 1),
          config: [180, 10]
        }
      }
    },
    handleMouseMove ({ pageX, pageY }) {
      const {order, lastPress, isPressed, delta: [dx, dy]} = this
      if (isPressed) {
        const col = clamp(Math.floor((pageX - left) / width), 0, 2)
        const row = clamp(Math.floor((pageY - top) / height), 0, Math.floor(count / 3))
        const index = row * 3 + col
        const newOrder = reinsert(order, order.indexOf(lastPress), index)
        this.mouse = [pageX - dx, pageY - dy]
        this.order = newOrder
      }
      this.$refs.spring.raf(true, false)
    },
    handleMouseUp () {
      this.isPressed = false
      this.dx = this.dy = 0
      this.$refs.spring.raf(true, false)
    },
    handleMouseDown (key, [pressX, pressY], {pageX, pageY}) {
      const dx = pageX - pressX
      const dy = pageY - pressY
      this.lastPress = key
      this.isPressed = true
      this.delta = [dx, dy]
      this.mouse = [pageX - dx, pageY - dy]
      this.$refs.spring.raf(true, false)
    }
  },
  components: {
    Spring
  }
}
</script>

<style>
    .demo3 {
      width: 500px;
      height: 600px;
      background-color: lightgray;
    }
    .demo3-ball {
      position: absolute;
      border: 1px solid black;
      border-radius: 99px;
      width: 50px;
      height: 50px;
    }
</style>
