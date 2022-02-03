import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import SlidingPuzzle from './SlidingPuzzle'
import TextMatch from './TextMatch'
import reportWebVitals from './reportWebVitals'
import GameCharacrerPage from './GameCharacter'
import ImageSearchPage from './ImageSearchPage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  // useLocation,
} from 'react-router-dom'
import App from './App'

function RouterWrapper() {
  return (
    <>
      <nav>
        <Link to="/">home</Link>
        <Link to="/sliding-puzzle">sliding puzzle</Link>
        <Link to="/text-match">text match</Link>
        <Link to="/game-character">Game Character</Link>
        <Link to="/image-search">Image Search</Link>
      </nav>
      <main className="bd">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/sliding-puzzle" element={<SlidingPuzzle />} />
          <Route path="/text-match" element={<TextMatch />} />
          <Route path="/game-character" element={<GameCharacrerPage />} />
          <Route path="/image-search" element={<ImageSearchPage />} />
        </Routes>
      </main>
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <RouterWrapper />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
