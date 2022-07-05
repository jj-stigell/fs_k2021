const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
    {
      title: 'Why I never draw Mickey Mouse cartoons',
      author: 'Carl Barks',
      url: "www.disney.com",
      likes: 15,
    },
    {
      title: 'Why I hate mondays',
      author: 'Garfield',
      url: "www.cats.com",
      likes: 353,
    },
]
  
beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(initialBlogs[0])
  await noteObject.save()
  noteObject = new Blog(initialBlogs[1])
  await noteObject.save()
}, 100000)

test('Blogs have correct length', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
}, 100000)

afterAll(() => {
  mongoose.connection.close()
})
