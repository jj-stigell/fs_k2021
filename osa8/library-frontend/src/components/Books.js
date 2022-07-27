import { useQuery } from '@apollo/client'
import { queryBooks } from '../queries'
import { useState } from 'react'

const Books = () => {
  const queryResult = useQuery(queryBooks)
  const [ genreFilter, setFilter ] = useState(null)

  if (queryResult.loading) {
    return <div>loading...</div>
  }

  const books = genreFilter ? queryResult.data.allBooks.filter(book => book.genres.includes(genreFilter)) : queryResult.data.allBooks
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
        <button key="resetFilter" onClick={() => setFilter(null)}>Show all</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
        ))}
      </div>
    </div>
  )
}

export default Books
