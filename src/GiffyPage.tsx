import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import style from './GiffyPage.module.css'

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
  src: string
  title: string
}
interface GiphySearchPayload {
  title: string
  images: Record<string, { url: string }>
}

const GIPHY_API_KEY = 'plhBLXsAJx30wKhT00tfh1HKke2jqxc8'
let fetchTimer: number

function GiffyPage() {
  const [images, setImages] = useState<GiffyImage[]>([])
  const [searchParams, setSearchParams] = useSearchParams()
  const term = searchParams.get('term') ?? ''

  function _fetchImages(term: string): void {
    fetch(
      new Request(
        `https://api.giphy.com/vterm:string1/gifs/search?api_key=${GIPHY_API_KEY}&q=${term}`
      )
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json()
        } else {
          throw new Error('Something went wrong on api server!')
        }
      })
      .then((response) => {
        setImages(
          response.data.map((data: GiphySearchPayload) => {
            return {
              title: data.title,
              src: data.images.fixed_height.url,
            }
          })
        )
      })
      .catch((error) => {
        console.error(error)
      })
  }

  function onChangeTerm(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParams({ term: e.target.value })
    fetchTimer = bearDebounce(
      () => {
        _fetchImages(e.target.value)
      },
      200,
      fetchTimer
    )
  }

  return (
    <div>
      <form>
        <input type="search" onInput={onChangeTerm} value={term} />
      </form>
      <ul className={style.grid}>
        {images.map((image, i) => (
          <li key={i}>
            <img src={image.src} alt={image.title} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GiffyPage
