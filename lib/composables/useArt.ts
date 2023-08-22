/**
 * This module relies heavily on seeds and hashes to generate shapes. A seed is a string that is
 * used to deterministically generate a hash. A hash is a number representation of the seed
 * and it is used, along with its digits, to deterministically generate the dimensions of a shape.
 */

import P5 from 'p5';
import { ref, type Ref } from 'vue';
import { convertStringToHex, getRandomHex } from '../utils/color';
import { getHash, getRandomNumber } from '../utils/crypto';
import { getCoordinateFromHash, getDimensionFromHash, getLastDigits, getSubSeeds } from '../utils/vector';

/**
 * Canvas that will be drawn on
 */
export interface Canvas {
	width: number;
	height: number;
}

/**
 * Shape that will be drawn on the canvas
 */
export interface Shape {
	seed: string;
	x: number;
	y: number;
	color: string;
}

export interface QuadShape extends Shape {
	width: number;
	height: number;
}

export interface TriangleShape extends Shape {
	width: number;
	height: number;
}

export interface CircleShape extends Shape {
	diameter: number;
}

/**
 * Function that draws a shape
 */
export interface ShapeGenerator {
	(p: P5, seed: string, canvas: Canvas, prevShape?: Shape): Shape;
}

/**
 * Configurations for the artist composable
 */
interface ArtistConfig {
	/**
	 * Used to generate shapes in a deterministic way
	 */
	seed?: string;
	/**
	 * Number of shapes to draw
	 */
	shapeNumber?: number;
	/**
	 * Function that draws a shapes
	 */
	shapeGenerator: ShapeGenerator;
}

/**
 * Patterns that can be used to generate shapes
 */
export type Pattern = 'quad' | 'circle' | 'triangle';

/**
 * Artist is used to create a canvas and draw shapes on it
 */
function useArtist(p5Canvas: Ref) {
  if (!p5Canvas) {
    throw new Error('p5Canvas is required');
  }

  const p5Instance = ref<P5>();

  const seed = ref<string>();
  const hash = ref<number>();
  const shapeNumber = ref<number>(0);
  const canvasWidth = ref<number>(0);
  const canvasHeight = ref<number>(0);
  const shapes = ref<Shape[]>([]);

  /**
	 * Draws a canvas using p5.js
	 */
  function drawShapes(config: ArtistConfig): P5 {
    // set seed
    seed.value = config.seed || undefined;

    // set hash. If seed is not provided, then generate a random hash
    hash.value = seed.value
      ? getHash(seed.value, true)
      : getRandomNumber({ absolute: true, removeDouble: true });

    // set shape number. If not provided, then use the last digit of the hash
    shapeNumber.value = config.shapeNumber || Math.ceil(getLastDigits(hash.value) / 2);

    // set shape number to 1 if it is 0
    if (shapeNumber.value === 0) {
      shapeNumber.value = 1;
    }

    // Removes the p5 instance from the DOM if it exists to allow for
    // a new pattern `ShapeGenerator` to be configured instead of using
    // the `p5Instance.value.remove()` method which re-uses the previous
    // pattern's `ShapeGenerator` function.
    if (p5Instance.value) {
      p5Instance.value.remove();
    }

    // create a new p5 instance
    p5Instance.value = new P5((p: P5) => {
      // this function is called once, in the beginning
      p.setup = () => {
        canvasWidth.value = p5Canvas.value?.offsetWidth || 400;
        canvasHeight.value = p5Canvas.value?.offsetHeight || 400;
        const canvasElement = p.createCanvas(
          canvasWidth.value,
          canvasHeight.value
        );

        // append canvas to parent container
        canvasElement.parent(p5Canvas.value);

        // this method ensures that `p.draw()` is only called once. (remove it to see something cool)
        p.noLoop();
      };

      // This function can be called multiple times via `p.redraw()`, `p.loop()`, etc.
      p.draw = () => {
        // clear canvas
        p.clear(0, 0, canvasWidth.value, canvasHeight.value);

        // clear shapes
        shapes.value = [];

        // number of digits from seed that will be used to generate a shape, respectively.
        const digitsPerShape = getLastDigits(hash.value!);

        // array of seeds that will be used to generate shapes. One hash per shape to be generated.
        const shapeSeeds: string[] = getSubSeeds(
					hash.value!.toString(),
					shapeNumber.value,
					digitsPerShape
        );

        // draw new shapes
        for (let i = 0; i < shapeSeeds.length; i++) {
          // set canvas dimensions
          const canvas: Canvas = {
            width: canvasWidth.value,
            height: canvasHeight.value
          };

          // get previous shape
          const prevShape: Shape | undefined =						shapes.value.length > 0 ? shapes.value[i - 1] : undefined;

          // draw shape
          const shape = config.shapeGenerator(
            p,
            shapeSeeds[i],
            canvas,
            prevShape
          );

          // store shape
          shapes.value.push(shape);
        }
      };
    });

    return p5Instance.value;
  }

  return {
    p5Canvas,
    p5Instance,
    drawShapes
  };
}

/**
 * Pattern is used to create shapes (e.g. square, rectangle, circle, etc.)
 */
function usePattern() {
  /**
	 * List of patterns that can be used to generate shapes
	 */
  const patterns: Pattern[] = [ 'quad', 'circle', 'triangle' ];

  /**
	 * Returns square/rectangle shape
	 */
  function createQuadShape(
    p: P5,
    seed: string,
    canvas: Canvas,
    prevShape?: Shape
  ): QuadShape {
    const hash = getHash(seed || getRandomNumber() + '', true);
    const color = seed ? convertStringToHex(hash + '') : getRandomHex();

    let { x, y } = getCoordinateFromHash(hash, canvas.width, canvas.height);
    const { width, height } = getDimensionFromHash(
      hash,
      canvas.width,
      canvas.height
    );

    // if previous shape exists, make sure that the new shape's coordinates are not within 100 pixels of the previous shape
    if (prevShape) {
      if (prevShape.x - 100 < x && x < prevShape.x + 100) {
        x = x + 100;
      }

      if (prevShape.y - 100 < y && y < prevShape.y + 100) {
        y = y + 100;
      }
    }

    // define shape
    const shape: QuadShape = {
      seed,
      x,
      y,
      width,
      height,
      color
    };

    // draw shape
    p.fill(shape.color);
    p.rect(shape.x, shape.y, shape.width, shape.height);

    return shape;
  }

  /**
	 * Returns circle shape
	 */
  function createCircleShape(
    p: P5,
    seed: string,
    canvas: Canvas,
    prevShape?: Shape
  ): CircleShape {
    const hash = getHash(seed || getRandomNumber() + '', true);
    const color = seed ? convertStringToHex(hash + '') : getRandomHex();

    let { x, y } = getCoordinateFromHash(
      hash,
      canvas.width,
      canvas.height,
      false
    );
    const { diameter } = getDimensionFromHash(
      hash,
      canvas.width,
      canvas.height
    );

    // if previous shape exists, make sure that the new shape's coordinates are not within 100 pixels of the previous shape
    if (prevShape) {
      if (prevShape.x - 100 < x && x < prevShape.x + 100) {
        x = x + 100;
      }

      if (prevShape.y - 100 < y && y < prevShape.y + 100) {
        y = y + 100;
      }
    }

    // define shape
    const shape: CircleShape = {
      seed,
      x,
      y,
      diameter,
      color
    };

    // draw shape
    p.fill(shape.color);
    p.circle(shape.x, shape.y, shape.diameter * 2);

    return shape;
  }

  /**
	 * Returns triangle shape
	 */
  function createTriangleShape(
    p: P5,
    seed: string,
    canvas: Canvas,
    prevShape?: Shape
  ): TriangleShape {
    const hash = getHash(seed || getRandomNumber() + '', true);
    const color = seed ? convertStringToHex(hash + '') : getRandomHex();

    let { x, y } = getCoordinateFromHash(
      hash,
      canvas.width,
      canvas.height,
      false
    );
    const { width, height } = getDimensionFromHash(
      hash,
      canvas.width,
      canvas.height
    );

    // if previous shape exists, make sure that the new shape's coordinates are not within 100 pixels of the previous shape
    if (prevShape) {
      if (prevShape.x - 100 < x && x < prevShape.x + 100) {
        x = x + 100;
      }

      if (prevShape.y - 100 < y && y < prevShape.y + 100) {
        y = y + 100;
      }
    }

    // define shape
    const shape: TriangleShape = {
      seed,
      x,
      y,
      width,
      height,
      color
    };

    // draw shape
    p.fill(shape.color);
    p.triangle(
      shape.x,
      shape.y,
      shape.x + shape.width,
      shape.y,
      shape.x + shape.width,
      shape.y + shape.height
    );

    return shape;
  }

  return {
    patterns,
    createQuadShape,
    createCircleShape,
    createTriangleShape
  };
}

export { useArtist, usePattern };
