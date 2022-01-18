import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import SlidingPuzzle from './SlidingPuzzle'
import TextMatch from './TextMatch'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <nav>
        <Link to="/">home</Link>
        <Link to="/sliding-puzzle">sliding puzzle</Link>
        <Link to="/text-match">text match</Link>
      </nav>
      <main className="bd">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sliding-puzzle" element={<SlidingPuzzle />} />
          <Route path="/text-match" element={<TextMatch />} />
        </Routes>
      </main>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
