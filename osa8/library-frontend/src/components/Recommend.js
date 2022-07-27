import { useQuery, useLazyQuery } from '@apollo/client'
import { getUser, queryBooksWithGenre } from '../queries'
import { useEffect, useState } from 'react'

const Recommend = () => {
  const user = useQuery(getUser)
  const [ getFilteredBooks, result ] = useLazyQuery(queryBooksWithGenre)
  const [ favGenre, setFavGenre ] = useState('')
  const [ filteredBooks, setFilteredBooks ] = useState([])

  useEffect(() => {
    if (user.data) {
      setFavGenre(user.data.me.favouriteGenre)
      getFilteredBooks({ variables: { genre: favGenre } })
    }
  }, [getFilteredBooks, user, favGenre])

  useEffect(() => {
    if (result.data) {
      setFilteredBooks(result.data.allBooks)
    }
  }, [setFilteredBooks, result, filteredBooks])

  if (user.loading) {
    return <div>loading...</div>
  }

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
          {filteredBooks.map((a) => (
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
