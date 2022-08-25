import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('Visible and unvisible content', () => {

  let container
  const blog = {
    title: 'Test title',
    author: 'Someone',
    url: 'www.google.com',
    likes: 6
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
  })

  test('Content has title and author visible', () => {
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('Test title')
    expect(div).toHaveTextContent('Someone')
  })

  test('url and likes not visible', () => {
    const div = container.querySelector('.hiddenFirst')
    expect(div).toHaveStyle('display: none')
  })
})

test('like button is clicked twice, the event handler the component received as props is called twice', async () => {

  const blog = {
    title: 'Test title',
    author: 'Someone',
    url: 'www.google.com',
    likes: 6
  }

  const blogUser = {
    name: 'TesterMan',
    username: 'JeeJee',
    id: '123456789'
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} addLike={mockHandler} user={blogUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})