import { useState } from 'react'
import style from './TextMatch.module.css'
import patterns from './data/text-match-mock.json'
import { isMatch } from './utils/regex-match'
export default function () {
  const [text, setText] = useState('abcd')
  const [activePattern, setActivePattern] = useState(0)
  return (
    <section className={style.main}>
      <h1>Text matcher</h1>
      <fieldset className={style.fieldset}>
        {patterns.map((pattern, i) => (
          <p key={`${pattern}-${i}`} className={style.patternContainer}>
            <input
              className={style.radioCard}
              name="pattern"
              type="radio"
              value={pattern}
              data-index={i}
              onChange={onSelect}
              id={`${pattern}-${i}-radio`}
            />
            <label htmlFor={`${pattern}-${i}-radio`}>{pattern}</label>
          </p>
        ))}
      </fieldset>
      <input
        className={style.textInput}
        data-valid={isMatch(text, patterns[activePattern]) ? 'valid' : 'invalid'}
        placeholder="enter something"
        value={text}
        onInput={onInput}
      />
    </section>
  )
  function onSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedIndex = parseInt(e.target?.dataset?.index ?? '0')
    setActivePattern(selectedIndex)
  }
  function onInput(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value)
  }
}
