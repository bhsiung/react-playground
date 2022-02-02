export enum OPT {
  PLUS = '+',
  MINUS = '-',
}

const DEBUGGING = false

export function calculate(s: string): number {
  const core = new CalStack() // {num: 16, operator: null}
  let num = 0
  let negative = false

  s = s.replace(/\s+/, '')

  // 13+3
  for (let i = 0; i <= s.length; i++) {
    const char = s.charAt(i) // +

    if (/^\d$/.test(char)) {
      num = num * 10 + parseInt(char) // 3
    } else {
      if (negative && char !== '(') {
        num *= -1
        negative = false
      }
      if (i > 0) {
        core.push({ num })
      }
      num = 0
      if (char === '') {
        return core.output()
      } else if (char === '-') {
        // TODO remove empty  string in the beginning
        // we currently only support negative sign at the beginning of a line
        if (i === 0) {
          negative = true
        } else {
          core.push({ operator: OPT.MINUS })
        }
      } else if (char === '+') {
        core.push({ operator: OPT.PLUS })
      } else if (char === '(') {
        const sub = findSub(s, i)
        if (DEBUGGING) console.log({ sub })
        num = calculate(sub)
        if (negative) {
          num *= -1
          negative = false
        }
        core.push({ num })
        i += sub.length + 1
      } else {
        throw new Error('the string is invalid')
      }
    }
  }

  throw new Error('the string is invalid')
}

export class CalStack {
  private num?: number
  private operator?: OPT
  push({ operator, num }: { operator?: OPT; num?: number }): void {
    if (DEBUGGING)
      console.log(
        'before',
        JSON.stringify({
          num: this.num,
          operator: this.operator,
          arg: arguments[0],
        })
      )
    if (num !== undefined) {
      if (this.operator) {
        // has both, calculate!
        if (this.operator === OPT.MINUS) {
          this.num = (this.num as number) - num
        } else {
          this.num = (this.num as number) + num
        }
        this.operator = undefined
      } else {
        // has nothing, add number
        this.num = num
      }
    } else if (operator) {
      if (this.num && this.operator) {
        // has both!
        throw new Error('need an number now!')
      } else if (this.operator) {
        throw new Error('need a number, operator is already defined')
      } else {
        // has no operator, add it
        this.operator = operator
      }
    } else {
      throw new Error(
        'need either number or operator, got: ' + JSON.stringify(arguments[0])
      )
    }
    if (DEBUGGING)
      console.log(
        'after',
        JSON.stringify({
          num: this.num,
          operator: this.operator,
          arg: arguments[0],
        })
      )
  }
  output(): number {
    return this.num ?? 0
  }
}

function findSub(s: string, start: number): string {
  let stack = 0 // 0
  let sub = '' // '(1+2-(3-2)'
  for (let i = start; i < s.length; i++) {
    const char = s.charAt(i) // )
    if (char === '(') {
      stack++
    } else if (char === ')') {
      stack--
    }

    if (stack === 0) return sub.slice(1)
    sub += char
  }
  throw new Error('unable to find the end')
}
