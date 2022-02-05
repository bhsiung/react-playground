import { render, fireEvent, screen } from '@testing-library/react'
import ImageSearchPage from './ImageSearchPage'
import * as searchImage from './utils/search-images'

it('renders with or without a name', async () => {
  jest.spyOn(searchImage, 'fetchImages').mockImplementation(() =>
    Promise.resolve([
      {
        color: '#333',
        webLink: 'https://image.com/a.html',
        title: 'title0',
        src: 'https://image.com/image0.jpg',
        user: {
          bio: 'bio foo',
          image: 'https://image.com/image1.jpg',
          name: 'bear',
          webLink: 'https://image.com/b.html',
        },
      },
    ])
  )
  render(<ImageSearchPage />)
  expect(screen.getByTestId('title')).toHaveTextContent('Image page')
  expect(screen.getByTestId('search-term')).toHaveAttribute('type', 'search')
  expect(screen.getByTestId('search-term')).toHaveValue('')
  expect(screen.getByTestId('search-term')).toHaveAttribute(
    'placeholder',
    'search for image'
  )
  expect(screen.getByTestId('search-term')).toHaveFocus()
  fireEvent.input(screen.getByTestId('search-term'), {
    target: { value: 'omg' },
  })
  await screen.findByTestId('image-container')
  expect(searchImage.fetchImages).toBeCalledWith('omg')
  expect(screen.getAllByTestId('image-container')).toHaveLength(1)
  expect(screen.getByTestId('image-container')).toHaveStyle(
    'background-image: url(https://image.com/image0.jpg)'
  )
  // meta rendered
  expect(screen.getByTestId('meta')).toBeInTheDocument()
  expect(screen.getByTestId('photo-by')).toHaveTextContent('by bear')
  expect(screen.getByTestId('description')).toHaveTextContent('title0')
  // author rendered
  // author avatar rendered
  // author avatar has link
  // web link to the full picture rendered
})
