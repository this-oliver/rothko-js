import { useTheme as useVuetifyTheme } from 'vuetify/lib/framework.mjs'
import { useCrypto } from './useCrypto'

const materialDesignColors = [
  'primary',
  'secondary',
  'accent',
  'error',
  'info',
  'success',
  'warning'
]

const notAllowedColors = [
  '#ffffff',
  '#000000',
  '#F5F5F5', // lightTheme.background
  '#133317' // darkTheme.background
]

export function useColor () {
  const { getHash } = useCrypto()

  /**
   * Returns a random Material Design color
   */
  function getRandomColor (): string {
    return materialDesignColors[Math.floor(Math.random() * materialDesignColors.length)]
  }

  /**
   * Returns a random hex color
   */
  function getRandomHexColor (): string {
    // random hex color generator
    const color = '#' + Math.floor(Math.random() * 16777215).toString(16)

    // if color is white or black, generate a new one
    if (notAllowedColors.includes(color)) {
      return getRandomHexColor()
    }

    return color
  }

  /**
   * Returns hex representation of a Material Design color
   */
  function getMaterialColor (color: string): string {
    const theme = useVuetifyTheme()
    return theme.global.current.value.colors[color]
  }

  /**
   * Returns a hex color based on a string
   */
  function convertStringToColor (str: string): string {
    // convert string to hash
    const hash = getHash(str)

    // convert hash to hex
    const hex = Math.abs(hash).toString(16)
      .slice(0, 6)

    return `#${hex}`
  }

  /**
   * Returns true if color is a valid hex color
   */
  function isHexColor (color: string): boolean {
    return /^#[0-9A-F]{6}$/i.test(color)
  }

  return {
    getRandomColor,
    getRandomHexColor,
    getMaterialColor,
    isHexColor,
    convertStringToColor
  }
}
