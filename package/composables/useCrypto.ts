interface RandomConfig {
    min?: number;
    max?: number;
    absolute?: boolean;
    removeDouble?: boolean;
  }

export function useCrypto () {

  /**
   * Returns a hash from a string. The hash is a number between between 0 and 1.
   */
  function getHash (input: string, absolute?: boolean): number {
    let hash = input.split('').reduce((acc, char) => {
      acc = ((acc << 5) - acc) + char.charCodeAt(0)
      return acc & acc
    }, 0)

    if(absolute) {
      // convert hash to positive number
      hash = Math.abs(hash);
    }

    return hash;
  }

  function getRandomNumber({ min = 0, max = 1, absolute = false, removeDouble = false }: RandomConfig = {}): number {
    let rand = Math.random() * (max - min) + min;

    if(absolute) {
      rand = Math.abs(rand);
    }

    if(removeDouble) {
      rand = parseInt(rand.toString().slice(2))
    }

    return rand;
  }

  return {
    getHash,
    getRandomNumber
  }
}
