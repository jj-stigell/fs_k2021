const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch (exception) {
        next(exception)
    }
})
  
blogsRouter.post('/', async (request, response, next) => {
    const newBlog = request.body
    if (!newBlog.title || !newBlog.url) {
        return response.status(400).end()
    }

    newBlog.likes = newBlog.likes ? newBlog.likes : 0
    const blog = new Blog(newBlog)

    try {
        const result = await blog.save()
        response.status(201).json(result)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  })

module.exports = blogsRouter