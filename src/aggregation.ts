export function sum(numbers: number[]): number {
  console.log("hello world");
  return numbers.reduce((acc, val) => acc + val, 0);
}
