const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const MONGODB_URI = process.env.TEST_MONGODB_URI
const JWT_SECRET = process.env.SECRET

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Author {
    name: String!
    id: String!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author,
    createUser(
      username: String!
      favouriteGenre: String!
    ): User,
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({})
      return books.length
    },
    authorCount: async () => {
      const authors = await Author.find({})
      return authors.length
    },
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        const booksFound = await Book.find({ author: author._id }).populate('author')
        return booksFound.filter(book => book.genres.includes(args.genre))
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({ author: author._id }).populate('author')
        return books
      } else if (args.genre) {
        const books = await Book.find({}).populate('author')
        return books.filter(book => book.genres.includes(args.genre))
      } else {
        const books = await Book.find({}).populate('author')
        return books
      }
    },
    allAuthors: async () => { return await Author.find({}) },
    me: (root, args, context) => { return context.currentUser }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return (await Book.find({ author: author._id })).length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {

      if (!context.currentUser) {
        throw new UserInputError("wrong credentials")
      }

      const author = await Author.findOne({ name: args.author })
      if (author) {
        const book = new Book({ ...args, author: author._id })
        return (await book.save())
          .populate('author')
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      } else {
        const newAuthor = new Author({ name: args.author, born: null })
        newAuthor.save()
        const book = new Book({ ...args, author: newAuthor._id })
        return (await book.save())
          .populate('author')
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      }
    },
    editAuthor: async (root, args, context) => {

      if (!context.currentUser) {
        throw new UserInputError("wrong credentials")
      }

      const author = await Author.findOne({ name: args.name })
      if (author) {
        author.born = args.setBornTo
        return author.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      } else {
        return null
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
      return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
    },
    login: async (root, args) =>{
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== '12345' ) {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})