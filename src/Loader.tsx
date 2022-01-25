import { ReactChild } from 'react'
import './Loader.css'

interface LoaderProps {
  isLoading: boolean
  children: ReactChild
}
function Loader ({ children, isLoading }: LoaderProps) {
  return (
    <div className="loader-container">
      {isLoading && <span className="loader"></span>}
      {children}
    </div>
  )
}

export default Loader
