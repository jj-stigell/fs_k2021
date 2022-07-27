import { useQuery } from '@apollo/client'
import { queryBooks, meInfo } from '../queries'

const Recommend = () => {
  const booksQuery = useQuery(queryBooks)
  const meQuery = useQuery(meInfo)

  if (meQuery.loading) {
    return <div>loading...</div>
  }

  const favGenre = meQuery.data.me.favouriteGenre
  const books = booksQuery.data.allBooks.filter(book => book.genres.includes(favGenre))

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre ({favGenre}) <strong>patterns</strong></p>
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
    </div>
  )
}

export default Recommend
