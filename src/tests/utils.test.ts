import { deepMerge } from "../libs/utils";

describe("deepMerge test", () => {
  test("", () => {
    expect(deepMerge({}, {})).toMatchObject({});
  });
});
