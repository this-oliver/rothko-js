interface RandomConfig {
    min?: number;
    max?: number;
    absolute?: boolean;
    removeDouble?: boolean;
  }

/**
   * Returns a hash from a string. The hash is a number between between 0 and 1.
   * 
   * @param input - The string to hash
   * @param absolute - If true, the hash will be a positive number
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

/**
   * 
   * @param config
   * @param config.min - The minimum number to return
   * @param config.max - The maximum number to return
   * @param config.absolute - If true, the number will be a positive number
   * @param config.removeDouble - If true, the number will not have a decimal point
   */
function getRandomNumber({ min = 0, max = 1, absolute = false, removeDouble = false }: RandomConfig = {}): number {
  let rand = Math.random() * (max - min) + min;

  // if rand is less than min, keep trying until it is not
  while(rand < min) {

    // if min is greater than 1, remove the decimal point
    if(min > 1){
      rand = Math.random() * (max - min) + min;
      rand = parseInt(rand.toString().slice(2))
    } else {
      rand = Math.random() * (max - min) + min;
    }
  }

  if(absolute) {
    rand = Math.abs(rand);
  }

  if(removeDouble) {
    rand = parseInt(rand.toString().slice(2))
  }

  return rand;
}

export {
  getHash,
  getRandomNumber
};

