import { getByText, render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import blogs from '../services/blogs'
import { expect } from 'vitest'
import CreateBlog from './CreateBlog'

describe('testing react component', () => {
  const blog = {
    title:'Automotive',
    url:'https://cloud.google.com/solutions/automotive',
    likes:0,
    author:'Mufidat'
  }
  const testUser = {
    username:'Omolabak\'s',
    name:'Omolabake Aramide',
    password:'iyanu3250'
  }

  test('render blog of title and author', () => {
    const  { container }  = render(<Blog blog={blog}/>)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
  })

  test('url and likes are shown when button is clicked', async() => {
    const  { container }  = render(<Blog blog={blog}/>)
    const user = userEvent.setup()
    const button = screen.getByText('View')
    await user.click(button)
    const div = container.querySelector('.blog')
    expect(div).toHaveTextContent('likes: 0')
    expect(div).toHaveTextContent('https://cloud.google.com/solutions/automotive')
  })

  test('like button clicked more than once', async() => {
    const mockHandler = vi.fn()
    render(<Blog blog={blog} likesHandler={mockHandler}/>)
    const user = userEvent.setup()
    const viewLikes = screen.getByText('View')
    await user.click(viewLikes)

    const likesButton = screen.getByText('like')
    await user.click(likesButton)
    await user.click(likesButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  test('<CreateBlog/> create a new blog form and call submit', async() => {
    const createBlog = vi.fn()
    const user = userEvent.setup()
    const { container } = render(<CreateBlog createBlog={createBlog}/>)
    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    await user.type(title, 'How to make soup')
    await user.type(author, 'Mufidat')
    await user.type(url, 'http://localhost:3000')
    const create = screen.getByText('create')
    await user.click(create)
    expect(createBlog.mock.calls[0][0].title).toBe('How to make soup')
  })
})