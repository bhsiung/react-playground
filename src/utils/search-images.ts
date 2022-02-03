// const GIPHY_API_KEY = 'plhBLXsAJx30wKhT00tfh1HKke2jqxc8'
export const ACCESS_KEY = 'FFJQuixYgNGgDz4PrQgmOAgRrCJJPz8HdsDeOlg6gd0'
export interface SearchPayload {
  color: string
  alt_description: string
  urls: { small: string }
  links: { html: string }
  user: {
    name: string
    profile_image: { medium: string }
    bio: string
    links: { html: string }
  }
}
interface ImageData {
  color: string
  src: string
  title: string
  webLink: string
  user: {
    bio: string
    image: string
    name: string
    webLink: string
  }
}

export async function fetchImages(term: string): Promise<ImageData[]> {
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
      response.results.map(
        (data: SearchPayload): ImageData => ({
          color: data.color,
          title: data.alt_description,
          src: data.urls.small,
          webLink: data.links.html,
          user: {
            bio: data.user.bio,
            webLink: data.user.links.html,
            image: data.user.profile_image.medium,
            name: data.user.name,
          },
        })
      )
    )
}
