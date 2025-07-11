import { expect } from "chai";
import { describe, it } from "vitest";
import { convertStringToHex, getRandomColor, getRandomHex, isHex } from "./color";

describe("useColor", () => {
  describe("isHex", () => {
    it("should return true if string is hex", () => {
      // starts with '#' and is followed by 6 characters that are either numbers or letters A-F
      const validSamples = ["#FFFFFF", "#000000", "#123456", "#ABCDEF", "#abcdef", "#123abc", "#456def"];

      for (let i = 0; i < validSamples.length; i++) {
        expect(isHex(validSamples[i])).to.equal(true);
      }
    });

    it("should return false if string is not a hex", () => {
      // starts with '#' and is followed by 6 characters that are either numbers or letters A-F
      const invalidSamples = ["s", "#######", "#123", "#12273737737373", "#ss"];

      for (let i = 0; i < invalidSamples.length; i++) {
        expect(isHex(invalidSamples[i])).to.equal(false);
      }
    });
  });

  describe("getRandomColor", () => {
    it("should be return a string", () => {
      const randColor = getRandomColor();

      expect(typeof randColor).to.equal("string");
    });
  });

  describe("getRandomHex", () => {
    it("should return a string", () => {
      const randColor = getRandomHex();

      expect(isHex(randColor)).to.equal(true);
    });
  });

  describe("convertStringToHex", () => {
    it("should return a string", () => {
      const color = convertStringToHex("test");

      expect(typeof color).to.equal("string");
    });

    it("should return a hex", () => {
      const color = convertStringToHex("test");

      expect(isHex(color)).to.equal(true);
    });
  });

  // * test suite below requires vuetify's `useTheme` to be mocked which idk how to do
  // --------------------------------------------------
  // describe('getMaterialHex', () => {
  //  it('should return a string', () => {
  //    const { getMaterialHex } = useColor()
  //    const color = getMaterialHex('primary')

  //    expect(typeof color).to.equal('string')
  //  })
  // })
});
