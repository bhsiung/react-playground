export function numberOfWeakCharacters(properties: number[][]): number[] {
  const orderMap = new Map<number[], number>()
  properties.forEach((p,i) => orderMap.set(p,i))

  let indice:number[] = []
  let max = 0
  properties.sort((a, b) => {
    if (a[0] !== b[0]) return b[0] - a[0]
    return a[1] - b[1] // so it can skip comparison within same attack
  })
  for (let i = 0; i < properties.length; i++) {
    max = Math.max(max, properties[i][1])
    if (properties[i][1] < max) indice.push(orderMap.get(properties[i]) as number)
  }
  return indice
}
