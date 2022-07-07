const User = require('../models/user')

const initialUser = {
  name: 'Carl Barks',
  username: 'Uncle Carl',
  password: "kfdsjfpoirwf34"
}

const newUser = {
  name: 'Bruce Wayne',
  username: 'Batman',
  password: "4356sdjet43"
}

const shortUsername = {
  name: 'Mikko Mikkola',
  username: 'rt',
  password: "34534534345"
}

const shortPassword = {
  name: 'Igleas Diot',
  username: 'Yes man',
  password: "24"
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialUser, newUser, shortUsername, shortPassword, usersInDb
}