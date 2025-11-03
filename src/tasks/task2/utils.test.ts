import { validatePesel } from "./utils";
import { expect, test } from "vitest";

test("validate pesel", () => {
  expect(validatePesel("")).toBe(false);
  expect(validatePesel("abc")).toBe(false);
  expect(validatePesel("010961494")).toBe(false);
  expect(validatePesel("12345678901")).toBe(false);
  expect(validatePesel("11111111111")).toBe(false);
  expect(validatePesel("52052009469")).toBe(true);
  expect(validatePesel("23121361263")).toBe(true);
  expect(validatePesel("77010961494")).toBe(true);
  expect(validatePesel("16310789782")).toBe(true);
  expect(validatePesel("16310789784")).toBe(false);
});
