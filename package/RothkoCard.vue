<script setup lang="ts">
import P5 from 'p5';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useColor, useCrypto } from './composables';

const props = defineProps({
  source: {
    type: String,
    default: undefined
  },
  color: {
    type: String,
    default: undefined
  },
  height: {
    type: String,
    default: '100px'
  },
  width: {
    type: String,
    default: '100%'
  },
  padding: {
    type: String,
    default: '0.5rem'
  },
  borderRadius: {
    type: String,
    default: '5px 5px 0px 0px'
  }
})

const { getMaterialColor, getRandomHexColor, convertStringToColor, isHexColor } = useColor()

const color = computed<string>(() => {
  if (props.source) {
    return convertStringToColor(props.source)
  }

  if (props.color && isHexColor(props.color)) {
    return props.color
  }

  if (props.color) {
    return getMaterialColor(props.color)
  }

  return getRandomHexColor()
})

// p5 generative are

const p5Instance = ref<P5>()
const p5Canvas = ref()

const { getHash } = useCrypto()

function drawCanvas (): void {
  interface Shape {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
  }
  function getRandomNumber (seed?: string): number {
    return seed ? getHash(seed) : Math.random()
  }

  function generateRandomShape (canvasWidth: number, canvasHeight: number, entropy?: string): Shape {
    const x = getRandomNumber(entropy) * canvasWidth
    const y = getRandomNumber(entropy) * canvasHeight

    const width = getRandomNumber(entropy) * 100 + 20
    const height = getRandomNumber(entropy) * 100 + 20
    const color = getRandomHexColor()

    return { x, y, width, height, color }
  }

  function drawShapes (p: P5, shapes: Shape[]): void {
    p.clear(0, 0, p.width, p.height)

    shapes.forEach((shape) => {
      p.fill(shape.color)
      p.rect(shape.x, shape.y, shape.width, shape.height)
    })
  }

  const sketch = (p: P5) => {
    const shapes: Shape[] = []

    p.setup = () => {
      // canvas element should fit the parent container
      const canvasWidth = p5Canvas.value?.offsetWidth || 400
      const canvasHeight = p5Canvas.value?.offsetHeight || 400
      const canvasElement = p.createCanvas(canvasWidth, canvasHeight)
      canvasElement.parent(p5Canvas.value || 'p5-canvas')

      for (let i = 0; i < 10; i++) {
        const width = p.width
        const height = p.height
        shapes.push(generateRandomShape(width, height))
      }
    }

    p.draw = () => {
      // Add your custom draw logic here if needed
      drawShapes(p, shapes)
    }
  }

  p5Instance.value = new P5(sketch)
}

onMounted(() => {
  // drawCanvas(props.source || color.value)
  drawCanvas()
})

onUnmounted(() => {
  if (p5Instance.value) {
    p5Instance.value?.remove()
  }
})

</script>

<template>
  <div
    :style="{
      backgroundColor: color,
      height: height,
      width: width,
      padding: padding,
      borderRadius: borderRadius
    }">
    <div
      id="p5-canvas"
      ref="p5Canvas" />
    <slot />
  </div>
</template>

<style>
#p5-canvas {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>
