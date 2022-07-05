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

  const initialBlogs = {
    title: 'I am too tired',
    author: 'Wage Slave',
    url: "www.ratrace.com",
    likes: 753,
  }

  await api
    .post('/api/blogs')
    .send(initialBlogs)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(blogsAtEnd[2].title).toEqual(initialBlogs.title)

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

afterAll(() => {
  mongoose.connection.close()
})
