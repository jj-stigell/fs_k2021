import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getContacts = () => {
    return axios.get(baseUrl)
}

const addContact = (contactInfo) => {
    return axios.post(baseUrl, contactInfo)
}

export default { getContacts, addContact }
