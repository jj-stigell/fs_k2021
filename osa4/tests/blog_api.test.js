const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./blog_helper')
const app = require('../app')
const api = supertest(app)
  
beforeEach(async () => {
  await Blog.deleteMany({})
  let noteObject = new Blog(helper.initialBlogs[0])
  await noteObject.save()
  noteObject = new Blog(helper.initialBlogs[1])
  await noteObject.save()
}, 100000)

test('Blogs have correct length', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('Blogs have id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0]._id).toBeDefined()
}, 100000)

test('Creates a new blog entry succesfully', async () => {
  await api
    .post('/api/blogs')
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogsAtEnd[2].title).toEqual(helper.newBlog.title)

}, 100000)

test('Missing likes property will default to the value 0', async () => {
  await api
    .post('/api/blogs')
    .send(helper.likesMissingBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[2].likes).toEqual(0)

}, 100000)

test('blog without title and/or url is not added', async () => {
  await api
    .post('/api/blogs')
    .send(helper.missingTitleAndUrl)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204)  // 204 No Content

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  const allIds = blogsAtEnd.map(r => r._id)
  expect(allIds).not.toContain(blogToDelete._id)
})

afterAll(() => {
  mongoose.connection.close()
})
