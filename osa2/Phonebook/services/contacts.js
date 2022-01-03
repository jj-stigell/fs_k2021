import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getContacts = () => {
    return axios.get(baseUrl)
}

const addContact = (contactInfo) => {
    return axios.post(baseUrl, contactInfo)
}

const deleteContact = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateContact = (id, contactInfo) => {
    const url = `${baseUrl}/${id}`
    return axios.put(url, contactInfo)
}

export default { getContacts, addContact, deleteContact, updateContact }
