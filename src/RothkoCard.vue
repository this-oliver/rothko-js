<script setup lang="ts">
import type { PropType } from "vue";
import type { Pattern, ShapeGenerator } from "./composables/useArt";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useArtist, usePattern } from "./composables/useArt";
import { convertStringToHex, getRandomHex, isHex } from "./utils/color";

const props = defineProps({
  source: {
    type: String,
    default: undefined
  },
  pattern: {
    type: String as PropType<Pattern>,
    default: "quad"
  },
  color: {
    type: String,
    default: undefined
  },
  height: {
    type: String,
    default: undefined
  },
  width: {
    type: String,
    default: undefined
  },
  marging: {
    type: String,
    default: undefined
  },
  padding: {
    type: String,
    default: "0.5rem"
  },
  borderRadius: {
    type: String,
    default: "5px 5px 0px 0px"
  }
});

/**
 * p5.js canvas element
 */
const p5Canvas = ref();

const { createQuadShape, createCircleShape, createTriangleShape } = usePattern();
const { p5Instance, drawShapes } = useArtist(p5Canvas);

const color = computed<string>(() => {
  let color = getRandomHex();

  // if source is provided, convert it to a color
  if (props.source) {
    color = convertStringToHex(props.source);
  }

  // if a color is provided and it is a hex color, use it
  if (props.color && isHex(props.color)) {
    color = props.color;
  }

  // if a color is provided and it is not a hex color, convert it to a color
  // only use common colors if the color is not a hex color - will return red if the color is not found
  if (props.color) {
    const COMMON_COLORS = [
      { label: "red", value: "#FF0000" },
      { label: "green", value: "#00FF00" },
      { label: "blue", value: "#0000FF" },
      { label: "yellow", value: "#FFFF00" },
      { label: "cyan", value: "#00FFFF" },
      { label: "magenta", value: "#FF00FF" }
    ];

    return COMMON_COLORS.find(c => c.label === props.color)?.value || COMMON_COLORS[0].value;
  }

  return color;
});

const style = computed<string>(() => {
  return `
    background-color: ${color.value};
    height: ${props.height};
    width: ${props.width};
    padding: ${props.padding};
    border-radius: ${props.borderRadius};
  `;
});

function getPattern(type: Pattern): ShapeGenerator {
  switch (type) {
    case "quad":
      return createQuadShape;
    case "circle":
      return createCircleShape;
    case "triangle":
      return createTriangleShape;
  }
}

// watch for changes in the source prop
watch(() => props.source, (newValue) => {
  // draw the canvas again
  drawShapes({
    shapeGenerator: getPattern(props.pattern),
    seed: newValue
  });
});

// watch for changes in the pattern prop
watch(() => props.pattern, (newValue) => {
  // draw the canvas again
  drawShapes({
    shapeGenerator: getPattern(newValue),
    seed: props.source
  });
});

onMounted(() => {
  drawShapes({
    shapeGenerator: createQuadShape,
    seed: props.source
  });
});

onUnmounted(() => {
  if (p5Instance.value) {
    p5Instance.value?.remove();
  }
});
</script>

<template>
  <div :style="style">
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
