import { describe, it, expect, vi } from "vitest";

import spready from "../src/spready";

describe("spready()", () => {
  describe("if()", () => {
    // Using thruty examples from https://developer.mozilla.org/en-US/docs/Glossary/Truthy
    describe("given a truthy condition", () => {
      describe("given an array", () => {
        it("returns the array", () => {
          const array = [1, 2, 3];

          expect(spready(array).if(true)).toBe(array);
          expect(spready(array).if({})).toBe(array);
          expect(spready(array).if([])).toBe(array);
          expect(spready(array).if(42)).toBe(array);
          expect(spready(array).if("0")).toBe(array);
          expect(spready(array).if("false")).toBe(array);
          expect(spready(array).if(-42)).toBe(array);
          expect(spready(array).if(12n)).toBe(array);
          expect(spready(array).if(3.14)).toBe(array);
          expect(spready(array).if(-3.14)).toBe(array);
          expect(spready(array).if(Infinity)).toBe(array);
          expect(spready(array).if(-Infinity)).toBe(array);
        });
      });

      describe("given an object", () => {
        it("returns the object", () => {
          const object = { a: "b" };

          expect(spready(object).if(true)).toBe(object);
          expect(spready(object).if({})).toBe(object);
          expect(spready(object).if([])).toBe(object);
          expect(spready(object).if(42)).toBe(object);
          expect(spready(object).if("0")).toBe(object);
          expect(spready(object).if("false")).toBe(object);
          expect(spready(object).if(-42)).toBe(object);
          expect(spready(object).if(12n)).toBe(object);
          expect(spready(object).if(3.14)).toBe(object);
          expect(spready(object).if(-3.14)).toBe(object);
          expect(spready(object).if(Infinity)).toBe(object);
          expect(spready(object).if(-Infinity)).toBe(object);
        });
      });

      describe("given a callback", () => {
        it("invokes the callback", () => {
          const array = [1, 2, 3];

          const mockFnConstructor = vi.fn(() => array);

          spready(() => mockFnConstructor()).if(true);
          spready(() => mockFnConstructor()).if({});
          spready(() => mockFnConstructor()).if([]);
          spready(() => mockFnConstructor()).if(42);
          spready(() => mockFnConstructor()).if("0");
          spready(() => mockFnConstructor()).if("false");
          spready(() => mockFnConstructor()).if(-42);
          spready(() => mockFnConstructor()).if(12n);
          spready(() => mockFnConstructor()).if(3.14);
          spready(() => mockFnConstructor()).if(-3.14);
          spready(() => mockFnConstructor()).if(Infinity);
          spready(() => mockFnConstructor()).if(-Infinity);

          expect(mockFnConstructor).toHaveBeenCalledTimes(12);
        });

        describe("given a callback returning an array", () => {
          it("returns the array returned by the callback", () => {
            const array = [1, 2, 3];

            expect(spready(() => array).if(true)).toBe(array);
            expect(spready(() => array).if({})).toBe(array);
            expect(spready(() => array).if([])).toBe(array);
            expect(spready(() => array).if(42)).toBe(array);
            expect(spready(() => array).if("0")).toBe(array);
            expect(spready(() => array).if("false")).toBe(array);
            expect(spready(() => array).if(-42)).toBe(array);
            expect(spready(() => array).if(12n)).toBe(array);
            expect(spready(() => array).if(3.14)).toBe(array);
            expect(spready(() => array).if(-3.14)).toBe(array);
            expect(spready(() => array).if(Infinity)).toBe(array);
            expect(spready(() => array).if(-Infinity)).toBe(array);
          });
        });

        describe("given a callback returning an object", () => {
          it("returns the object returned by the callback", () => {
            const object = { a: "b" };

            expect(spready(() => object).if(true)).toBe(object);
            expect(spready(() => object).if({})).toBe(object);
            expect(spready(() => object).if([])).toBe(object);
            expect(spready(() => object).if(42)).toBe(object);
            expect(spready(() => object).if("0")).toBe(object);
            expect(spready(() => object).if("false")).toBe(object);
            expect(spready(() => object).if(-42)).toBe(object);
            expect(spready(() => object).if(12n)).toBe(object);
            expect(spready(() => object).if(3.14)).toBe(object);
            expect(spready(() => object).if(-3.14)).toBe(object);
            expect(spready(() => object).if(Infinity)).toBe(object);
            expect(spready(() => object).if(-Infinity)).toBe(object);
          });
        });
      });
    });

    // Using falsy examples from https://developer.mozilla.org/en-US/docs/Glossary/Falsy
    describe("given a falsy condition", () => {
      it("returns an empty array", () => {
        const array = [1, 2, 3];

        expect(spready(array).if(false)).toEqual([]);
        expect(spready(array).if(null)).toEqual([]);
        expect(spready(array).if(undefined)).toEqual([]);
        expect(spready(array).if(0)).toEqual([]);
        expect(spready(array).if(-0)).toEqual([]);
        expect(spready(array).if(0n)).toEqual([]);
        expect(spready(array).if(NaN)).toEqual([]);
        expect(spready(array).if("")).toEqual([]);
      });

      describe("given a callback", () => {
        it("does not invoke the callback", () => {
          const array = [1, 2, 3];

          const mockFnConstructor = vi.fn(() => array);

          spready(() => mockFnConstructor()).if(false);
          spready(() => mockFnConstructor()).if(null);
          spready(() => mockFnConstructor()).if(undefined);
          spready(() => mockFnConstructor()).if(0);
          spready(() => mockFnConstructor()).if(-0);
          spready(() => mockFnConstructor()).if(0n);
          spready(() => mockFnConstructor()).if(NaN);
          spready(() => mockFnConstructor()).if("");

          expect(mockFnConstructor).toHaveBeenCalledTimes(0);
        });

        it("returns an empty array", () => {
          const array = [1, 2, 3];

          expect(spready(() => array).if(false)).toEqual([]);
          expect(spready(() => array).if(null)).toEqual([]);
          expect(spready(() => array).if(undefined)).toEqual([]);
          expect(spready(() => array).if(0)).toEqual([]);
          expect(spready(() => array).if(-0)).toEqual([]);
          expect(spready(() => array).if(0n)).toEqual([]);
          expect(spready(() => array).if(NaN)).toEqual([]);
          expect(spready(() => array).if("")).toEqual([]);
        });
      });
    });
  });

  describe("unless()", () => {
    // Using thruty examples from https://developer.mozilla.org/en-US/docs/Glossary/Truthy
    describe("given a truthy condition", () => {
      it("returns an empty array", () => {
        const array = [1, 2, 3];

        expect(spready(array).unless(true)).toEqual([]);
        expect(spready(array).unless({})).toEqual([]);
        expect(spready(array).unless([])).toEqual([]);
        expect(spready(array).unless(42)).toEqual([]);
        expect(spready(array).unless("0")).toEqual([]);
        expect(spready(array).unless("false")).toEqual([]);
        expect(spready(array).unless(-42)).toEqual([]);
        expect(spready(array).unless(12n)).toEqual([]);
        expect(spready(array).unless(3.14)).toEqual([]);
        expect(spready(array).unless(-3.14)).toEqual([]);
        expect(spready(array).unless(Infinity)).toEqual([]);
        expect(spready(array).unless(-Infinity)).toEqual([]);
      });

      describe("given a callback", () => {
        it("does not invoke the callback", () => {
          const array = [1, 2, 3];

          const mockFnConstructor = vi.fn(() => array);

          spready(() => mockFnConstructor()).unless(true);
          spready(() => mockFnConstructor()).unless({});
          spready(() => mockFnConstructor()).unless([]);
          spready(() => mockFnConstructor()).unless(42);
          spready(() => mockFnConstructor()).unless("0");
          spready(() => mockFnConstructor()).unless("false");
          spready(() => mockFnConstructor()).unless(-42);
          spready(() => mockFnConstructor()).unless(12n);
          spready(() => mockFnConstructor()).unless(3.14);
          spready(() => mockFnConstructor()).unless(-3.14);
          spready(() => mockFnConstructor()).unless(Infinity);
          spready(() => mockFnConstructor()).unless(-Infinity);

          expect(mockFnConstructor).toHaveBeenCalledTimes(0);
        });

        it("returns an empty array", () => {
          const array = [1, 2, 3];

          expect(spready(() => array).unless(true)).toEqual([]);
          expect(spready(() => array).unless({})).toEqual([]);
          expect(spready(() => array).unless([])).toEqual([]);
          expect(spready(() => array).unless(42)).toEqual([]);
          expect(spready(() => array).unless("0")).toEqual([]);
          expect(spready(() => array).unless("false")).toEqual([]);
          expect(spready(() => array).unless(-42)).toEqual([]);
          expect(spready(() => array).unless(12n)).toEqual([]);
          expect(spready(() => array).unless(3.14)).toEqual([]);
          expect(spready(() => array).unless(-3.14)).toEqual([]);
          expect(spready(() => array).unless(Infinity)).toEqual([]);
          expect(spready(() => array).unless(-Infinity)).toEqual([]);
        });
      });
    });

    // Using falsy examples from https://developer.mozilla.org/en-US/docs/Glossary/Falsy
    describe("given a falsy condition", () => {
      describe("given an array", () => {
        it("returns the array", () => {
          const array = [1, 2, 3];

          expect(spready(array).unless(false)).toBe(array);
          expect(spready(array).unless(null)).toBe(array);
          expect(spready(array).unless(undefined)).toBe(array);
          expect(spready(array).unless(0)).toBe(array);
          expect(spready(array).unless(-0)).toBe(array);
          expect(spready(array).unless(0n)).toBe(array);
          expect(spready(array).unless(NaN)).toBe(array);
          expect(spready(array).unless("")).toBe(array);
        });
      });

      describe("given an object", () => {
        it("returns the object", () => {
          const object = { a: "b" };

          expect(spready(object).unless(false)).toBe(object);
          expect(spready(object).unless(null)).toBe(object);
          expect(spready(object).unless(undefined)).toBe(object);
          expect(spready(object).unless(0)).toBe(object);
          expect(spready(object).unless(-0)).toBe(object);
          expect(spready(object).unless(0n)).toBe(object);
          expect(spready(object).unless(NaN)).toBe(object);
          expect(spready(object).unless("")).toBe(object);
        });
      });

      describe("given a callback", () => {
        it("invokes the callback", () => {
          const array = [1, 2, 3];

          const mockFnConstructor = vi.fn(() => array);

          spready(() => mockFnConstructor()).unless(false);
          spready(() => mockFnConstructor()).unless(null);
          spready(() => mockFnConstructor()).unless(undefined);
          spready(() => mockFnConstructor()).unless(0);
          spready(() => mockFnConstructor()).unless(-0);
          spready(() => mockFnConstructor()).unless(0n);
          spready(() => mockFnConstructor()).unless(NaN);
          spready(() => mockFnConstructor()).unless("");

          expect(mockFnConstructor).toHaveBeenCalledTimes(8);
        });

        describe("given a callback returning an array", () => {
          it("returns the array returned by the callback", () => {
            const array = [1, 2, 3];

            expect(spready(() => array).unless(false)).toEqual(array);
            expect(spready(() => array).unless(null)).toEqual(array);
            expect(spready(() => array).unless(undefined)).toEqual(array);
            expect(spready(() => array).unless(0)).toEqual(array);
            expect(spready(() => array).unless(-0)).toEqual(array);
            expect(spready(() => array).unless(0n)).toEqual(array);
            expect(spready(() => array).unless(NaN)).toEqual(array);
            expect(spready(() => array).unless("")).toEqual(array);
          });
        });

        describe("given a callback returning an object", () => {
          it("returns the object returned by the callback", () => {
            const object = { a: "b" };

            expect(spready(() => object).unless(false)).toEqual(object);
            expect(spready(() => object).unless(null)).toEqual(object);
            expect(spready(() => object).unless(undefined)).toEqual(object);
            expect(spready(() => object).unless(0)).toEqual(object);
            expect(spready(() => object).unless(-0)).toEqual(object);
            expect(spready(() => object).unless(0n)).toEqual(object);
            expect(spready(() => object).unless(NaN)).toEqual(object);
            expect(spready(() => object).unless("")).toEqual(object);
          });
        });
      });
    });
  });
});
