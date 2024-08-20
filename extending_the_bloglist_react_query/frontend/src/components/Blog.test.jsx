import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders only title and author by default', () => {
  const blog = {
    title: 'Blog title',
    author: 'Tom',
    likes: 2,
    url: 'https://google.com',
    user: {
      name: 'Peter',
    }
  }
  const user = {
    name: 'Peter'
  }

  const { container } = render(<Blog blog={blog} user={user} />)
  const header = container.querySelector('.blog_header')
  expect(header).toHaveTextContent('Blog title Tom')
  const body = container.querySelector('blog_body')
  expect(body).toBeNull()
})

test('renders url and likes when button show have been clicked ', async () => {
  const blog = {
    title: 'Blog title',
    author: 'Tom',
    likes: 2,
    url: 'https://google.com',
    user: {
      name: 'Peter',
    }
  }
  const user = {
    name: 'Peter'
  }

  const { container } = render(<Blog blog={blog} user={user} />)
  const testUser = userEvent.setup()
  const button = screen.getByText('show')
  await testUser.click(button)
  const body = container.querySelector('blog_body')
  expect(body).toBeDefined()


})

test('update is called twice when like button is clicked two times', async () => {
  const blog = {
    title: 'Blog title',
    author: 'Tom',
    likes: 2,
    url: 'https://google.com',
    user: {
      name: 'Peter',
    }
  }
  const user = {
    name: 'Peter'
  }
  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} user={user} updateBlog={mockHandler} />)
  const testUser = userEvent.setup()
  const showButton = screen.getByText('show')
  await testUser.click(showButton)
  const likeButton = screen.getByText('like')
  await testUser.click(likeButton)
  await testUser.click(likeButton)
  expect(mockHandler.mock.calls).toHaveLength(2)


})
