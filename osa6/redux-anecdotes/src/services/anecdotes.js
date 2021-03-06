import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const addVote = async (id, information) => {
  const url = `${baseUrl}/${id}`
  const response = await axios.put(url, information)
  return response.data
}

export { getAll, addNew, addVote }