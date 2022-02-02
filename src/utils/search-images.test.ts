import { ACCESS_KEY, fetchImages } from './search-images'

it('search images', async () => {
  const mockedFetch = (global.fetch = jest.fn((request) => {
    if (/query=error/.test(request.url)) return Promise.reject('bad')
    if (/query=400/.test(request.url)) return Promise.resolve({ status: 400 })
    return Promise.resolve({
      status: 200,
      json: () =>
        Promise.resolve({
          results: [
            {
              description: 'title0',
              urls: {
                small: 'https://image.com/image0.jpg',
              },
            },
          ],
        }),
    })
  }) as jest.Mock)
  await expect(fetchImages('error')).rejects.toBe('bad')
  await expect(fetchImages('400')).rejects.toThrow(Error)
  await expect(fetchImages('bear')).resolves.toEqual([
    { title: 'title0', src: 'https://image.com/image0.jpg' },
  ])

  expect(mockedFetch).toHaveBeenCalledTimes(3)
  mockedFetch.mock.calls.forEach((args) => {
    const req = args[0]
    const [url, paramString] = req.url.split('?')
    expect(url).toBe('https://api.unsplash.com/search/photos')
    expect(paramString).toMatch(new RegExp('^orientation=squarish&per_page=20&query=.+$'))
    expect(req.headers.get('Accept-Version')).toBe('v1')
    expect(req.headers.get('Authorization')).toBe(`Client-ID ${ACCESS_KEY}`)
  })
})
