export {}
// enum OPT {
  // PLUS = '+',
  // MINUS = '-'
// }

// function calculate(s: string): number {
  // console.log(s)
  // let result = 0 // 12
  // let operation: OPT|null = null // +
  // let digit = null // 12
  // let negative = false
  // // 12 + 12 + 4
  // for(let i=0; i<=s.length; i++) {
    // const char = s.charAt(i) // 2

    // switch (char) {
      // case ' ': // skip white space
        // break
      // case '': // last char
        // calc()
        // break
      // case '-': // -
        // if (digit === null) {
          // negative = true
        // } else {
          // calc()
          // reset()
        // }
        // break
      // case '+': // +
        // calc()
        // reset()
        // break
      // case '(': // ()
        // const sub = findSub(s, i)
        // digit = calculate(sub)
        // i += sub.length + 1
        // break
      // default: // 0-9
        // if (digit === null) digit = 0
        // digit = digit * 10 + parseInt(char)
        // break
    // }
  // }
  // return result
  
  // function calc() {
    // if (digit === null) throw new Error('missing number for the calculation')
    
    // if (operation) { // proceed the previous calculation
      // if (operation === OPT.PLUS) {
        // result += digit
      // } else if (operation === OPT.MINUS) {
        // result -= digit
      // }        
    // } else { // register digit to result
      // result = digit
      // if (negative) {
        // result *= -1
        // negative = false
      // }
    // }
  // }
  // function reset() {
    // digit = null
    // operation = OPT.MINUS
  // }
// }

// class CalStack {
  // private stack:[number?, OPT?] = []
  // push ({ operator, num }: { operator: OPT, num: number }): void {
    // const [lastNum, lastOpt] = this.stack
    // if (num) {
      // if (lastNum && lastOpt) {

      // } else if (lastNum) {
        // throw new Error('need an operator to calc')
      // }
    // } else if (operator) {

    // } else {
      // throw new Error('need either number or operator')
    // }
  // }
// }

// function findSub(s: string, start: number): string {
  // let stack = 0 // 0
  // let sub = '' // '(1+2-(3-2)'
  // for (let i = start; i < s.length; i++ ) {
    // const char = s.charAt(i) // )
    // if (char === '(') {
      // stack++
    // } else if (char === ')') {
      // stack--
    // }

    // if (stack === 0) return sub.slice(1)
    // sub += char
  // }
  // throw new Error('unable to find the end')
// }
