import { expect } from 'chai'
import { describe, it } from 'vitest'
import { getHash, getRandomNumber } from './crypto'

describe('useCrypto', () => {  
  describe('getHash', () => {
    
    it('should return a number', () => {
      const input: string = 'test';
      const hash = getHash(input)

      expect(isNaN(hash)).to.equal(false)
    })

    it('should return same hash for same input', () => {
      const input: string = 'test';
      const itterations: number = 5; // number of times to test

      for(let i = 0; i < itterations; i++) {
        
        const sample: string = input + i.toString();
        const hash: number = getHash(sample)
        expect(hash).to.equal(getHash(sample))
      }
    })
  })

  describe('getRandomNumber', () => {
    it('should return a number', () => {
      const rand = getRandomNumber()

      expect(isNaN(rand)).to.equal(false)
    })

    it('should return a random number', () => {
      const itterations: number = 100; // number of times to test

      for(let i = 0; i < itterations; i++) {
        const rand: number = getRandomNumber()
        expect(rand).to.not.equal(getRandomNumber())
      }
    })

    it('should not return negative number, if absolute is set in config', () => {
      const itterations: number = 100; // number of times to test

      for(let i = 0; i < itterations; i++) {
        const rand: number = getRandomNumber({ absolute: true })
        expect(rand).to.be.greaterThanOrEqual(0)
      }
    })

    it('should not return a number less than min, if min set in config', () => {
      const min: number = 5;
      const itterations: number = 100; // number of times to test

      for(let i = 0; i < itterations; i++) {
        const rand: number = getRandomNumber({ min })
        expect(rand).to.be.greaterThanOrEqual(min)
      }
    })

    it('should not return a number greater than max, if max set in config', () => {
      const max: number = 5;
      const itterations: number = 100; // number of times to test

      for(let i = 0; i < itterations; i++) {
        const rand: number = getRandomNumber({ max })
        expect(rand).to.be.lessThanOrEqual(max)
      }
    })

  })
})
