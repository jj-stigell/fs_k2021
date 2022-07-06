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
        return response.status(400).end()   // 400 Bad Request
    }

    newBlog.likes = newBlog.likes ? newBlog.likes : 0
    const blog = new Blog(newBlog)

    try {
        const result = await blog.save()
        response.status(201).json(result)   // 201 Created
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()    // 204 No Content
    } catch (exception) {
      next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.status(200).json(result)   // 200 OK
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter