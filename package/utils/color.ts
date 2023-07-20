import { getHash, getRandomNumber } from './crypto';

/**
 * Copy/paste from vuetify
 */
interface Colors extends BaseColors, OnColors {
    [key: string]: string;
}
/**
 * Copy/paste from vuetify
 */
interface BaseColors {
    background: string;
    surface: string;
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    error: string;
    info: string;
}
/**
 * Copy/paste from vuetify
 */
interface OnColors {
    'on-background': string;
    'on-surface': string;
    'on-primary': string;
    'on-secondary': string;
    'on-success': string;
    'on-warning': string;
    'on-error': string;
    'on-info': string;
}

/**
 * Material Design Colors
 */
const MdColors = [
  'primary',
  'secondary',
  'accent',
  'error',
  'info',
  'success',
  'warning'
]

/**
 * Returns true if color is a valid hex color
 */
function isHex (color: string): boolean {
  return /^#[0-9A-F]{6}$/i.test(color)
}

/**
 * Returns a random Material Design color
 */
function getRandomColor (): string {
  return MdColors[Math.floor(getRandomNumber({ min: 0, max: MdColors.length - 1 }))]
}

/**
 * Returns a random hex color
 */
function getRandomHex (): string {
  // random hex color generator
  const color = '#' + Math.floor(getRandomNumber() * 16777215).toString(16)

  return color
}

/**
 * Returns hex representation of a Material Design color
 */
function getMaterialHex (color: string, colors: Colors ): string {
  return colors[color]
}

/**
 * Returns a hex color based on a string
 */
function convertStringToHex (str: string): string {
  // convert string to hash that is positive
  const hash = getHash(str, true)
  
  // convert numerical value into a string representation (for hex conversion)
  const hashString = hash.toString(16)

  // extract first 6 characters from hash string (to create a hex color)
  const hex = hashString.slice(0, 6)

  return `#${hex}`
}

export {
  convertStringToHex,
  getMaterialHex,
  getRandomColor,
  getRandomHex,
  isHex
};

