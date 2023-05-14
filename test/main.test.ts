import { test } from "@src";

describe(`main`, function () {
  it(`should work`, function () {
    expect(test.param).to.equal(`test`);
  });
});
