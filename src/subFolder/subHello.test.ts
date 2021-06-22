import { hello } from "./subHello";

describe("SubHello", () => {
  it("Says correct thing", () => {
    const result = hello("you");
    expect(result).toEqual("Hello you");
  });
});
