interface Pattern {
  hasStar: boolean
  value: string
}
export function isMatch(s: string, p: string): boolean {
  const patterns = breakPattern(p)
  return dp(s, patterns)
}
function dp(s: string, _patterns: Pattern[]): boolean {
  const patterns = [..._patterns]
  if (patterns.length === 0 && s.length === 0) return true
  if (patterns.length === 0) return false
  const p = patterns.shift() as Pattern
  if (p.hasStar) {
    // 1. if is last pattern
    if (patterns.length === 0) {
      if (p.value === '.') return true
      for (let i = 0; i < s.length; i++) {
        if (s.charAt(i) !== p.value) {
          return false
        }
      }
      return true
    }
    // 2. consider * has length of 0
    if (dp(s, patterns)) return true
    // 3. try match next pattern by removing consecutive chars from the current pattern
    while (s.charAt(0) === p.value || (s.length > 0 && p.value === '.')) {
      s = s.slice(1)
      if (dp(s, patterns)) return true
    }
    return false
  }
  if (s.length === 0) return false
  if (p.value !== '.' && s.charAt(0) !== p.value) {
    return false
  }
  return dp(s.slice(1), patterns)
}
export function breakPattern(p: string): Pattern[] {
  const patterns: Pattern[] = []
  for (let i = 0; i < p.length; i++) {
    const char = p.charAt(i)
    let hasStar = false
    if (i < p.length - 1 && p.charAt(i + 1) === '*') {
      i++
      hasStar = true
    }
    patterns.push({
      value: char,
      hasStar,
    })
  }
  return patterns
}
