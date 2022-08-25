const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./user_helper')
const app = require('../app')
const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash(helper.initialUser.password, 10)
    const user = new User({ name: helper.initialUser.name, username: helper.initialUser.username, password: passwordHash })
    await user.save()
  }, 100000)

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(helper.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(helper.newUser.username)
  }, 100000)

  test('creation fails with already existing username', async () => {
    const usersAtStart = await helper.usersInDb()
    const result = await api
      .post('/api/users')
      .send(helper.initialUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    // Length not changed, user not added
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(result.body.error).toContain('username must be unique')
  }, 100000)

  test('creation fails with too short username', async () => {
    const usersAtStart = await helper.usersInDb()
    const result = await api
      .post('/api/users')
      .send(helper.shortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    // Length not changed, user not added
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(result.body.error).toContain('username and/or password must be at least 3 characters')
  }, 100000)

  test('creation fails with too short password', async () => {
    const usersAtStart = await helper.usersInDb()
    const result = await api
      .post('/api/users')
      .send(helper.shortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    // Length not changed, user not added
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
    expect(result.body.error).toContain('username and/or password must be at least 3 characters')
  }, 100000)
})

afterAll(() => {
  mongoose.connection.close()
})
