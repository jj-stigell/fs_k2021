import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  } catch (exception) {
    return exception.response.data
  }
}

const update = newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, create, update }
