<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useArtist, useColor, usePattern } from './composables';

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

/**
 * p5.js canvas element
 */
const p5Canvas = ref();

const { createQuadShape } = usePattern();
const { p5Instance, drawShapes } = useArtist(p5Canvas);
const {
  getMaterialColor,
  getRandomHexColor,
  convertStringToColor,
  isHexColor
} = useColor();

const color = computed<string>(() => {
  let color = getRandomHexColor()

  // if source is provided, convert it to a color
  if (props.source) {
    color = convertStringToColor(props.source)
  }

  // if a color is provided and it is a hex color, use it
  if (props.color && isHexColor(props.color)) {
    color = props.color
  }

  // if a color is provided and it is not a hex color, convert it to a color
  if (props.color) {
    color = getMaterialColor(props.color)
  }

  return color
})

// watch for changes in the source prop
watch(() => props.source, (newValue) => {
  // draw the canvas again
  drawShapes({ 
    shapeGenerator: createQuadShape, 
    seed: newValue
  });
})

onMounted(() => {
  drawShapes({
    shapeGenerator: createQuadShape,
    seed: props.source
  });
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

    <!-- WARNING: change id and ref with caution  -->
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
