import P5 from 'p5';
import { ref, type Ref } from 'vue';
import { useColor, useCrypto } from './index';

/**
 * Canvas that will be drawn on
 */
interface Canvas {
	canvasWidth: number;
	canvasHeight: number;

  /**
   * Used to generate shapes in a deterministic way
   */
	seed?: string;
}

/**
 * Shape that will be drawn on the canvas
 */
interface Shape {
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
}

/**
 * Function that draws a shape
 */
interface ShapeGenerator {
	(canvas: Canvas): Shape;
}

/**
 * Artist is used to create a canvas and draw shapes on it
 */
function useArtist(p5Canvas: Ref) {
  /**
	 * p5.js instance
	 */
  const p5Instance = ref<P5>();

  /**
   * shapes to be drawn on the canvas
   */
  const shapes = ref<Shape[]>([]);

  /**
	 * Draws a canvas using p5.js
	 */
  function drawCanvas(shapeGenerator: ShapeGenerator, source?: string): void {

    // if p5 instance already exists, destroy it
    if (p5Instance.value) {
      p5Instance.value.remove();
    }
    
    // create a new p5 instance
    p5Instance.value = new P5((p: P5) => {
      let width = 0;
      let height = 0;
      
      p.setup = () => {
        // canvas element should fit the parent container
        const canvasWidth = p5Canvas.value?.offsetWidth || 400;
        const canvasHeight = p5Canvas.value?.offsetHeight || 400;
        const canvasElement = p.createCanvas(canvasWidth, canvasHeight);

        // append canvas to parent container
        canvasElement.parent(p5Canvas.value);

        // setup canvas details
        width = p.width;
        height = p.height;

        // prepare shapes
        for (let i = 0; i < 10; i++) {
          const shape = shapeGenerator({ 
            canvasWidth: width, 
            canvasHeight: height, 
            seed: source 
          });
          
          shapes.value.push(shape)
        }
      };

      p.draw = () => {
        // clear canvas
        p.clear(0, 0, p.width, p.height);

        // draw shapes
        shapes.value.forEach((shape) => {
          p.fill(shape.color);
          p.rect(shape.x, shape.y, shape.width, shape.height);
        });
      };
    });
  }

  return {
    p5Canvas,
    p5Instance,
    drawCanvas
  };
}

/**
 * Pattern is used to create shapes (e.g. square, rectangle, circle, etc.)
 */
function usePattern() {
  /**
	 * Returns square/rectangle shape
	 */
  function createQuadShape(canvas: Canvas): Shape {
    const { getHash } = useCrypto();
    const { getRandomHexColor } = useColor();

    const { canvasWidth, canvasHeight, seed } = canvas;

    function _getRandomNumber(seed?: string): number {
      return seed ? getHash(seed) : Math.random();
    }

    const x = _getRandomNumber(seed) * canvasWidth;
    const y = _getRandomNumber(seed) * canvasHeight;

    const width = _getRandomNumber(seed) * 100 + 20;
    const height = _getRandomNumber(seed) * 100 + 20;
    const color = getRandomHexColor();

    return { x, y, width, height, color };
  }

  return {
    createQuadShape
  };
}

export { useArtist, usePattern };
