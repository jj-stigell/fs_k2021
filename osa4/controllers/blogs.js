const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { name: 1, username: 1 })
        response.json(blogs)
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        const newBlog = request.body

        if (!newBlog.title || !newBlog.url) {
            return response.status(400).end()   // 400 Bad Request
        }

        newBlog.likes = newBlog.likes ? newBlog.likes : 0
        newBlog.user = user
        const blog = new Blog(newBlog)
        const savedBlog = await blog.save()

        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        const result = await Blog.find({}).populate('user', { name: 1, username: 1 })
        response.status(201).json(result)   // 201 Created
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)
        const blog = await Blog.findById(request.params.id)

        if (user.id === blog.user.toString()) {
            await Blog.findByIdAndRemove(request.params.id)
            response.status(204).end()    // 204 No Content
        } else { 
            return response.status(401).json({ 
                error: 'token missing or invalid or you are not the owner of that blog' 
            })  // 401 Unauthorized
        }
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