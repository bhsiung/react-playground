export function printSubstring (s:string): void {
  for (let length = 1; length <= s.length; length++) {
    // abc, l = 1, the last one will be c, which start with 2 => 3 - 1
    // abc, l = 2, the last one will be bc, which start with 1 => 3 - 2
    for (let i = 0; i <= s.length - length; i++) {
      console.log(s.substr(i, length))
    }
  }
}

printSubstring('abc')
printSubstring('ABA')
