import { isWhat, isPrime } from "@lolcat/is-what";

test(`isWhat`, () => {
  expect(isWhat(2)).to.equal(`even`);
});

test(`isPrime`, () => {
  expect(isPrime(2)).to.be.true;
});
