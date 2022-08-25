import { gql } from '@apollo/client'

const queryBooks = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}
`

const queryBooksWithGenre = gql`
query allBooks($genre: String!) {
  allBooks(
    genre: $genre
  ) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

const queryAuthors = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const getUser = gql`
query {
  me {
    username
    favouriteGenre
  }
}
`

const newBook = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author {
      name
    },
    published,
    genres
  }
}
`

const setYearBorn = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name,
    born
  }
}
` 

const loginUser = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  ) {
    value
  }
}
` 

export { queryBooks, queryBooksWithGenre, queryAuthors, getUser, newBook, setYearBorn, loginUser }
