import { render, fireEvent, screen } from '@testing-library/react'
import GiffyPage from './GiffyPage'
import * as searchImage from './utils/search-images'

it('renders with or without a name', async () => {
  jest.spyOn(searchImage, 'fetchImages').mockImplementation(() =>
    Promise.resolve([
      {
        title: 'title0',
        src: 'https://image.com/image0.jpg',
      },
    ])
  )
  render(<GiffyPage />)
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
  expect(screen.getByTestId('image')).toHaveStyle(
    'background-image: url(https://image.com/image0.jpg)'
  )
  // TODO loader rendered
})
