import { isEven } from "@lolcat/is-even";
import { isOdd } from "@lolcat/is-odd";
import { primeNumbers } from "@lolcat/resources/primes";

export function isWhat(n: number) {
  if (isEven(n)) return `even`;
  if (isOdd(n)) return `odd`;
  throw new Error(`not a number`);
}

export function isPrime(n: number) {
  return primeNumbers.includes(n);
}
