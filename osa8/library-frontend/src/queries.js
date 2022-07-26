import { gql } from '@apollo/client'

const queryBooks = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
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

const newBook = gql`
mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author,
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

export { queryBooks, queryAuthors, newBook, setYearBorn }
