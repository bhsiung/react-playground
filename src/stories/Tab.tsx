import { ReactNode, useState } from 'react'
import './Tab.css'

interface TabData {
  title: string | ReactNode
  disable: boolean
  body: string | ReactNode
}
interface TabProps {
  tabName: string
  value: TabData[]
  defaultTabIndex: number
}

/**
 * Primary UI component for user interaction
 */
export function Tab({ tabName, defaultTabIndex = 0, value = [] }: TabProps) {
  const [activeIndex, setActiveIndex] = useState(defaultTabIndex)
  return (
    <div className="tab-view">
      <ul role="tablist" aria-label={tabName}>
        {value.map((tab, index) => (
          <li>
            <button
              id={`tab-${index}`}
              autoFocus
              role="tab"
              aria-selected={index === activeIndex ? 'true' : 'false'}
              tabIndex={index === activeIndex ? 0 : -1}
              type="button"
              className={index === activeIndex ? 'active-tab tab' : 'tab'}
              disabled={tab.disable}
              onClick={() => setActiveIndex(index)}
              onKeyUp={(e) => onPressArrow(e)}
            >
              {tab.title}
            </button>
          </li>
        ))}
      </ul>
      <article
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`tab-${activeIndex}`}
      >
        {value[activeIndex].body}
      </article>
    </div>
  )
  function onPressArrow({ keyCode }: React.KeyboardEvent) {
    if (keyCode === 37) setActiveIndex((activeIndex - 1) % value.length)
    else if (keyCode === 39) setActiveIndex((activeIndex + 1) % value.length)
  }
}
