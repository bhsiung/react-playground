export function reduce(items: any[], callback: (acc: any, item: any, index?: number) => any, initialValue: any) {
  let acc: any = initialValue;
  for (let index = 0; index < items.length; index++) {
    acc = callback(acc, items[index], index);
  }
  return acc;
}
