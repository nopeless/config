import { isEven } from "@lolcat/is-even";

export function isOdd(num: number): boolean {
  return !isEven(num);
}
