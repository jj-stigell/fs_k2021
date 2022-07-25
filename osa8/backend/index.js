const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
require('dotenv').config()
const Book = require('./models/book')
const Author = require('./models/author')
const MONGODB_URI = process.env.TEST_MONGODB_URI

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
    ): Author
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
        const booksFound = await Book.find({ author: author._id })
        return booksFound.filter(book => book.genres.includes(args.genre))
      } else if (args.author) {
        const author = await Author.findOne({ name: args.author })
        const books = await Book.find({ author: author._id })
        return books
      } else if (args.genre) {
        const books = await Book.find({})
        return books.filter(book => book.genres.includes(args.genre))
      } else {
        const books = await Book.find({})
        return books
      }
    },
    allAuthors: async () => {return await Author.find({})},
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      return (await Book.find({ author: author._id })).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      if (author) {
        const book = new Book({ ...args, author: author._id })
        return (await book.save()).populate('author')
      } else {
        const newAuthor = new Author({ name: args.author, born: null })
        newAuthor.save()
        const book = new Book({ ...args, author: newAuthor._id })
        return (await book.save()).populate('author')
      }
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (author) {
        console.log("found")
        author.born = args.setBornTo
        return author.save()
      } else {
        return null
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})