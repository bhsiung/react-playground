import React from 'react'
import './App.css'

function App() {
  return (
    <>
      <header>I am the header</header>
      <main>
        In order to make t
        <section aria-label="my super section">
          something special in this section
        </section>
        he structure more accessible to user agents that support ARIA as well as
        ensuring that user agents that don't support HTML5 can also understand
        the structure, adding the ARIA role="contentinfo" with a corresponding
        aria-label that describes the section is advised. This would take the
        form.
      </main>
      <aside>i am the aside</aside>
      <section></section>
      <footer>i am the footer</footer>
      Hello
    </>
  )
}

export default App
