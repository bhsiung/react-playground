// const GIPHY_API_KEY = 'plhBLXsAJx30wKhT00tfh1HKke2jqxc8'
export const ACCESS_KEY = 'FFJQuixYgNGgDz4PrQgmOAgRrCJJPz8HdsDeOlg6gd0'
export interface SearchPayload {
  description: string
  urls: Record<string, string>
}
interface GiffyImage {
  src: string
  title: string
}

export async function fetchImages(term: string): Promise<GiffyImage[]> {
  const headers = new Headers()
  headers.append('Accept-Version', 'v1')
  headers.append('Authorization', `Client-ID ${ACCESS_KEY}`)
  const param = new URLSearchParams()
  param.append('query', term)
  param.append('orientation', 'squarish')
  param.append('per_page', '20')
  param.sort()
  return fetch(
    new Request(`https://api.unsplash.com/search/photos?${param.toString()}`, {
      headers,
    })
  )
    .then((response) => {
      if (response.status === 200) {
        return response.json()
      } else {
        throw new Error('Something went wrong on api server!')
      }
    })
    .then((response) =>
      response.results.map((data: SearchPayload) => ({
        title: data.description,
        src: data.urls.small,
      }))
    )
}
