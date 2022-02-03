import { useEffect, useState } from 'react'
import style from './ImageSearchPage.module.css'
import Loader from './Loader'
import { fetchImages } from './utils/search-images'
// import { useSearchParams } from 'react-router-dom'
import { AiOutlineDownload } from 'react-icons/ai'

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

interface ImageProp {
  imageStyle: { backgroundImage: string; backgroundColor: string }
  title: string
  webLink: string
  user: {
    bio: string
    image: string
    name: string
    webLink: string
  }
}
const DEBOUNCE_DELAY = 400
let fetchTimer: number

function GiffyPage() {
  const [images, setImages] = useState<ImageProp[]>([])
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
                (data): ImageProp => ({
                  title: data.title,
                  user: data.user,
                  webLink: data.webLink,
                  imageStyle: {
                    backgroundImage: `url(${data.src})`,
                    backgroundColor: data.color,
                  },
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
            <li key={i} data-testid="image-container" style={image.imageStyle}>
              <div className={style.imageMeta}>
                <h3>by {image.user.name}</h3>
                <h2 data-testid="description">{image.title}</h2>
                <footer>
                  <a
                    className={style.imageActionItem}
                    href={image.webLink}
                    aria-label="view the original page"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiOutlineDownload />
                  </a>
                  <a
                    href={image.user.webLink}
                    target="_blank"
                    className={style.imageAvatar}
                    rel="noreferrer"
                  >
                    <img src={image.user.image} alt={image.user.name} />
                  </a>
                </footer>
              </div>
            </li>
          ))}
        </ul>
      </Loader>
    </div>
  )
}

export default GiffyPage
