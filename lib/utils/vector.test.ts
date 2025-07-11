import { expect } from "chai";
import { describe, it } from "vitest";
import { getHash } from "./crypto";
import { getCoordinateFromHash, getDimensionFromHash, getLastDigits, getSubSeeds } from "./vector";

describe("vectorHelper", () => {
  describe("getLastDigits", () => {
    it("should return a number", () => {
      const input: number = 123456789;
      const output: number = getLastDigits(input);

      expect(typeof output).to.equal("number");
    });

    it("should return the last number", () => {
      expect(getLastDigits(123456789)).to.equal(9);
      expect(getLastDigits(123)).to.equal(3);
      expect(getLastDigits(1)).to.equal(1);
      expect(getLastDigits(100)).to.equal(0);
    });
  });

  describe("getSubSeeds", () => {
    it("should return an array of strings", () => {
      const input: string = "test";
      const numberOfSubSeeds: number = 3;
      const digitsPerSubSeed: number = 3;
      const output: string[] = getSubSeeds(input, numberOfSubSeeds, digitsPerSubSeed);

      expect(Array.isArray(output)).to.equal(true);
      expect(typeof output[0]).to.equal("string");
    });

    it("should return the correct number of sub-seeds", () => {
      const input: string = "test";
      const numberOfSubSeeds: number = 3;
      const digitsPerSubSeed: number = 3;
      const output: string[] = getSubSeeds(input, numberOfSubSeeds, digitsPerSubSeed);

      expect(output.length).to.equal(numberOfSubSeeds);
    });
  });

  describe("getCoordinateFromHash", () => {
    it("should should return an object with x and y", () => {
      const hash = getHash("test");
      const obj = getCoordinateFromHash(hash, 100, 100);

      expect(obj).to.be.an("object");

      expect(obj).to.have.property("x");
      expect(obj.x).to.be.a("number");

      expect(obj).to.have.property("y");
      expect(obj.y).to.be.a("number");
    });

    it.skip("should not exceed the max horizontal");
    it.skip("should not exceed the max vertical");
    it.skip("should only use first half of canvas, if useWholeCanvase is not set");
  });

  describe("getDimensionFromHash", () => {
    it("should return an object with width, height, and diameter", () => {
      const hash = getHash("test");

      const obj = getDimensionFromHash(hash, 100, 100);
      expect(obj).to.be.an("object");

      expect(obj).to.have.property("width");
      expect(obj.width).to.be.a("number");

      expect(obj).to.have.property("height");
      expect(obj.height).to.be.a("number");

      expect(obj).to.have.property("diameter");
      expect(obj.diameter).to.be.a("number");
    });

    it("should never exceed the max width or height", () => {
      const itterations: number = 50;
      let maxWidth: number = 100;
      let maxHeight: number = 100;

      for (let i = 0; i < itterations; i++) {
        const hash = getHash(i.toString());
        const obj = getDimensionFromHash(hash, maxWidth, maxHeight);

        expect(obj.width).to.be.at.most(maxWidth);
        expect(obj.height).to.be.at.most(maxHeight);
        expect(obj.diameter).to.be.at.most(maxWidth);
      }

      maxWidth = 5;
      maxHeight = 5;

      for (let i = 0; i < itterations; i++) {
        const hash = getHash(i.toString());
        const obj = getDimensionFromHash(hash, maxWidth, maxHeight);

        expect(obj.width).to.be.at.most(maxWidth);
        expect(obj.height).to.be.at.most(maxHeight);
        expect(obj.diameter).to.be.at.most(maxWidth);
      }

      maxWidth = 1;
      maxHeight = 1;

      for (let i = 0; i < itterations; i++) {
        const hash = getHash(i.toString());
        const obj = getDimensionFromHash(hash, maxWidth, maxHeight);

        expect(obj.width).to.be.at.most(maxWidth);
        expect(obj.height).to.be.at.most(maxHeight);
        expect(obj.diameter).to.be.at.most(maxWidth);
      }

      maxWidth = 50;
      maxHeight = 100;

      for (let i = 0; i < itterations; i++) {
        const hash = getHash(i.toString());
        const obj = getDimensionFromHash(hash, maxWidth, maxHeight);

        expect(obj.width).to.be.at.most(maxWidth);
        expect(obj.height).to.be.at.most(maxHeight);
        expect(obj.diameter).to.be.at.most(maxWidth);
      }
    });
  });
});
