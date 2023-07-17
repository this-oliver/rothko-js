export function useCrypto () {

  /**
   * Returns a hash of a string
   */
  function getHash (input: string): number {
    return input.split('').reduce((acc, char) => {
      acc = ((acc << 5) - acc) + char.charCodeAt(0)
      return acc & acc
    }, 0)
  }

  return {
    getHash
  }
}
