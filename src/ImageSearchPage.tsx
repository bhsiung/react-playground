import { useEffect, useState } from 'react'
import style from './ImageSearchPage.module.css'
import Loader from './Loader'
import { fetchImages } from './utils/search-images'
import { AiOutlineDownload, AiOutlineBulb } from 'react-icons/ai'
import { useSearchParams } from 'react-router-dom'

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

function ImageSearchPage() {
  const [images, setImages] = useState<ImageProp[]>([])
  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [term, setTerm] = useState(searchParams.get('term') ?? '')
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
    setSearchParams({ term: e.target.value })
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
        <ImageList images={images} />
      </Loader>
    </div>
  )
}

export function ImageList({ images }: { images: ImageProp[] }) {
  return (
    <ul className={style.grid}>
      {images.length ? (
        images.map((image, i) => (
          <li key={i} data-testid="image-container" style={image.imageStyle}>
            <div className={style.imageMeta}>
              <h3 data-testid="photo-by">by {image.user.name}</h3>
              <h2 data-testid="description">{image.title}</h2>
              <footer data-testid="meta">
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
        ))
      ) : (
        <li className={style.emptyGrid}>
          <p className={style.emptyGridIcon}>
            <AiOutlineBulb />
          </p>
          the list is empty
        </li>
      )}
    </ul>
  )
}

export default ImageSearchPage
