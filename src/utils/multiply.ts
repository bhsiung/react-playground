#!/usr/bin/env ts-node

export class Tuple {
  data: [number, number, number][] = [];
  // (4, 5, 3), (6, 2, 3), (9, 3, 4)
  constructor(message: string) {
    const parts = message.matchAll(/\((\d+),\s*(\d+),\s*(\d+)\)/g);
    // TODO
    // for(const [, a, b, c] of parts) {
    // this.data.push([
    // Number.parseInt(a),
    // Number.parseInt(b),
    // Number.parseInt(c),
    // ])
    // }
  }

  multiply(n: number): number {
    return this.data.reduce((result, items) => {
      return result * items[n];
    }, 1);
  }
}

const foo = new Tuple("(4, 5, 3), (6, 2, 3), (9, 3, 4)");
console.log(foo.multiply(2));
