import { test } from "@src";

describe(`main`, function () {
  it(`should work`, function () {
    expect(process.env).to.not.be.null;
    expect(test.param).to.equal(`test`);
  });
});
