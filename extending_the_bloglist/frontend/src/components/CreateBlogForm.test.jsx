import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogFrom from './CreateBlogForm'


/**
Make a test for the new blog form. The test should check,
that the form calls the event handler it received as props with the right details when a new blog is created.
 */
test('createBlogForm calls the event handler with the right details', async () => {
  const mockCreate = vi.fn()
  const user = userEvent.setup()
  const { container } = render(<CreateBlogFrom createBlog={mockCreate} />)

  const titleInput = container.querySelector('#title')
  const authorInput = container.querySelector('#author')
  const urlInput = container.querySelector('#url')
  const createButton = screen.getByText('Create')

  await user.type(titleInput, 'Don Quijote de la Mancha')
  await user.type(authorInput, 'Cervantes')
  await user.type(urlInput, 'http://google.com')
  await user.click(createButton)

  expect(mockCreate.mock.calls).toHaveLength(1)
  console.log(mockCreate.mock.calls)
  expect(mockCreate.mock.calls[0][0].title).toBe('Don Quijote de la Mancha')
  expect(mockCreate.mock.calls[0][0].author).toBe('Cervantes')
  expect(mockCreate.mock.calls[0][0].url).toBe('http://google.com')

})