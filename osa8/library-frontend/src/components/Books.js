import { useQuery, useLazyQuery } from '@apollo/client'
import { queryBooks, queryBooksWithGenre } from '../queries'
import { useState, useEffect } from 'react'

const Books = () => {
  const queryResult = useQuery(queryBooks)
  const [ getFilteredBooks, result ] = useLazyQuery(queryBooksWithGenre)
  const [ books, setBooks ] = useState([])

  useEffect(() => {
    if (queryResult.data) {
      setBooks(queryResult.data.allBooks)
    }
  }, [queryResult])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  const filterBooks = async (genre) => {
    getFilteredBooks({ variables: { genre } })
  }

  if (queryResult.loading) {
    return <div>loading...</div>
  }

  let genres = queryResult.data.allBooks.flatMap(book => book.genres)
  genres = [...new Set(genres)]

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button key="resetFilter" onClick={() => setBooks(queryResult.data.allBooks)}>Show all</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => filterBooks(genre)}>{genre}</button>
        ))}
      </div>
    </div>
  )
}

export default Books
