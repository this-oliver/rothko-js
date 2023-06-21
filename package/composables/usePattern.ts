import P5 from 'p5';
import { ref } from 'vue';
import { useColor, useCrypto } from '.';

interface Shape {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export function usePattern() {
  const p5Instance = ref<P5>()
  const p5Canvas = ref()

  const { getHash } = useCrypto()
  const { getRandomHexColor } = useColor()

  function drawCanvas(): void {
    p5Instance.value = new P5((p: P5) => {
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
          shapes.push(_generateRandomShape(width, height))
        }
      }

      p.draw = () => {
        // Add your custom draw logic here if needed
        _drawShapes(p, shapes)
      }
    })
  }

  function _getRandomNumber(seed?: string): number {
    return seed ? getHash(seed) : Math.random()
  }

  function _generateRandomShape(canvasWidth: number, canvasHeight: number, entropy?: string): Shape {
    const x = _getRandomNumber(entropy) * canvasWidth
    const y = _getRandomNumber(entropy) * canvasHeight

    const width = _getRandomNumber(entropy) * 100 + 20
    const height = _getRandomNumber(entropy) * 100 + 20
    const color = getRandomHexColor()

    return { x, y, width, height, color }
  }

  function _drawShapes(p: P5, shapes: Shape[]): void {
    p.clear(0, 0, p.width, p.height)

    shapes.forEach((shape) => {
      p.fill(shape.color)
      p.rect(shape.x, shape.y, shape.width, shape.height)
    })
  }

  return {
    p5Instance,
    p5Canvas,
    drawCanvas
  }
}