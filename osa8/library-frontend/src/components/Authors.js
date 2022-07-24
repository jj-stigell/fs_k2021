import { useQuery, useMutation } from '@apollo/client'
import { queryAuthors, setYearBorn } from '../queries'

const Authors = (props) => {
  const queryResult = useQuery(queryAuthors)
  const [ mutateBirthyear ] = useMutation(setYearBorn, {
    refetchQueries: [ { query: queryAuthors } ]
  })

  const setYear = async (event) => {
    event.preventDefault()
    const name = event.target.name.value
    const born = parseInt(event.target.born.value)
    mutateBirthyear({ variables: { name, born } })
  }

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
      <h2>set birthyear</h2>
      <form onSubmit={setYear}>
        <label>name: <input name="name" /></label>
        <br />
        <label>born: <input name="born" /></label>
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
