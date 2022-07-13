import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Togglable />', () => {

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

  test('url and likes not visble', () => {
    const div = container.querySelector('.hiddenFirst')
    expect(div).toHaveStyle('display: none')
  })
})