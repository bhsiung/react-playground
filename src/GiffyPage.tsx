import { useEffect, useState } from 'react'
import style from './GiffyPage.module.css'
import Loader from './Loader'
import { fetchImages } from './utils/search-images'
// import { useSearchParams } from 'react-router-dom'

function bearDebounce(
  fn: Function,
  waitTime: number,
  prevTimer: number,
  ...args: any[]
): number {
  clearTimeout(prevTimer)
  return window.setTimeout(() => {
    fn(...args)
  }, waitTime) as number
}

interface GiffyImage {
  imageStyle: { backgroundImage: string }
  title: string
}
const DEBOUNCE_DELAY = 400
let fetchTimer: number

function GiffyPage() {
  const [images, setImages] = useState<GiffyImage[]>([])
  const [loading, setLoading] = useState(false)
  const [term, setTerm] = useState('')
  // const [searchParams, setSearchParams] = useSearchParams()
  useEffect(() => {
    fetchTimer = bearDebounce(
      () => {
        if (term.length > 0) {
          setLoading(true)
          fetchImages(term).then((images) => {
            setLoading(false)
            setImages(
              images.map(
                (data): GiffyImage => ({
                  title: data.title,
                  imageStyle: { backgroundImage: `url(${data.src})` },
                })
              )
            )
          })
        } else {
          setImages([])
        }
      },
      DEBOUNCE_DELAY,
      fetchTimer
    )
  }, [term])

  function onChangeTerm(e: React.ChangeEvent<HTMLInputElement>) {
    // setSearchParams({ term: e.target.value })
    setTerm(e.target.value)
  }

  return (
    <div className={style.imageSearch}>
      <form>
        <h1 data-testid="title">Image page</h1>
        <input
          data-testid="search-term"
          onInput={onChangeTerm}
          placeholder="search for image"
          type="search"
          autoFocus
          value={term}
        />
      </form>
      <Loader isLoading={loading}>
        <ul className={style.grid}>
          {images.map((image, i) => (
            <li key={i} data-testid="image-container">
              <figure style={image.imageStyle} data-testid="image" aria-label={image.title}></figure>
            </li>
          ))}
        </ul>
      </Loader>
    </div>
  )
}

export default GiffyPage
