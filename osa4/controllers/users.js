const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
    const { name, username, password } = request.body
    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({
            error: 'username and/or password must be at least 3 characters'
        })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return response.status(400).json({
        error: 'username must be unique'
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        name,
        username,
        passwordHash,
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }
})

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
        response.json(users)
    } catch (exception) {
        next(exception)
    }
})

module.exports = usersRouter
