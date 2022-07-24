import { gql, useQuery } from '@apollo/client'

const Authors = (props) => {
  const queryAuthors = gql`
    query {
      allAuthors {
        name
        born
        bookCount
      }
    }
  `
  const queryResult = useQuery(queryAuthors)

  if (queryResult.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
    return null
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {queryResult.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
