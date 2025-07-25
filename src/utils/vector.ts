/**
 * Returns the last digit of a number from the left.
 *
 * @param num - number to get the last digit from
 * @param digitNum - number of digits to get from the number (default is 1)
 */
function getLastDigits(num: number, digitNum?: number): number {
  const numStr = num.toString();

  // if digitNum is not provided or is greater than the length of the number, then set it to 1
  if (!digitNum || (digitNum && digitNum > numStr.length)) {
    digitNum = 1;
  }

  return Number.parseInt(numStr[numStr.length - digitNum]);
}

/**
 * Returns a list of deterministic sub-seeds from the original seed. (e.g. if original hash is
 * 0.123456789 and shapeNumber is 3, then each shape will be generated by using 3 digits from
 * the original hash and starting from left to right such that: `shapeHashes = [123, 456, 789]` )
 *
 * @param seed - original seed
 * @param subSeedNum - number of sub-seeds to generate
 * @param digitsPerShape - number of digits to use from the original seed to generate each sub-seed
 */
function getSubSeeds(
  seed: string,
  subSeedNum: number,
  digitsPerShape: number
): string[] {
  let index = 0;
  const seeds: string[] = [];

  while (seeds.length < subSeedNum) {
    let extraction: string;

    // index has reached the end of the seed, so start over
    // and increment the `digitsPerShape` to get more randomness
    if (index >= seed.length) {
      index = 0;
      digitsPerShape++;
    }

    // index is about to go out of bounds, so break the
    // seed-to-extact into two parts
    if (index + digitsPerShape > seed.length) {
      const diff = index + digitsPerShape - seed.length;
      const first = seed.slice(index, seed.length);
      const second = seed.slice(0, diff);

      extraction = `${first}${second}`;

      index = diff;
      digitsPerShape++;
    } else {
      extraction = seed.slice(index, index + digitsPerShape);
      index += digitsPerShape;
    }

    seeds.push(extraction);
  }

  return seeds;
}

/**
 * Returns a coordinate that is positive and less than 1 based on a hash that is positive and less
 * than 1. This is possible by breaking down the canvas into a 3x3 grid and returning a coordinate
 * within this space.
 *
 * note: this function never returns a coordinate that is in the last column or row of the grid to
 * avoid shapes being drawn outside of the canvas
 */
function getCoordinateFromHash(
  hash: number,
  maxHorizontal: number,
  maxVertical: number,
  useWholeCanvase?: boolean
): { x: number, y: number } {
  let x = 0;
  let y = 0;

  // sectionWidth and sectionHeight are used to break down the canvas into 6 quadrants
  //
  // note: if `useWholeCanvase` is false, then the values are decided by cutting the canvas
  // in half vertically and horizontally to avoid shapes being drawn outside of the canvas
  const sectionWidth = useWholeCanvase
    ? maxHorizontal / 3
    : maxHorizontal / 2 / 3;

  const sectionHeight = useWholeCanvase
    ? maxVertical / 3
    : maxHorizontal / 2 / 3;

  // indicators are used to determine which quadrant the shape will be placed in
  const xIndicator = getLastDigits(hash + hash);
  const yIndicator = getLastDigits(hash * hash);

  // determine which quadrant the shape will be placed in. For the horizontal position, 0-3 is the
  // left half of the canvas, 3-6 is the center, and 6-9 is the right half. For the vertical, 0-3 is
  // the top half of the canvas, 3-6 is the center, and 6-9 is the bottom half
  //
  // note: math isn't thought out well here. It just needs to be reproducible

  if (xIndicator >= 0 && xIndicator <= 3) {
    x = sectionWidth - (sectionWidth - xIndicator);
  } else if (xIndicator > 3 && xIndicator <= 6) {
    x = sectionWidth * 2 - xIndicator;
  } else {
    x = sectionWidth * 3 - xIndicator;
  }

  if (yIndicator >= 0 && yIndicator <= 3) {
    y = sectionHeight - (sectionHeight - yIndicator);
  } else if (yIndicator > 3 && yIndicator <= 6) {
    y = sectionHeight * 2 - yIndicator;
  } else {
    y = sectionHeight * 3 - yIndicator;
  }

  return { x, y };
}

/**
 * Returns the dimensions for a shape based on a given hash. The dimension includes width, height, and
 * radius of a shape.
 */
function getDimensionFromHash(
  hash: number,
  maxWidth: number,
  maxHeight: number
): { width: number, height: number, diameter: number } {
  // get the last three digits from the hash
  hash = Number.parseInt(hash.toString().slice(-3));

  let width = hash * hash;
  let height = hash * hash;
  let diameter = hash;

  while (width > maxWidth) {
    width = width / 3;
  }

  while (height > maxHeight) {
    height = height / 3;
  }

  while (diameter > maxWidth) {
    diameter = diameter / 3;
  }

  return { width, height, diameter };
}

export { getCoordinateFromHash, getDimensionFromHash, getLastDigits, getSubSeeds };
