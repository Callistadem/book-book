import axios from 'axios'
const baseUrl = ''

const login = async (email, password) => {
    const response = await axios.post(`${baseUrl}/login`, { email, password})
    return response.data
}

const register = async (username, email, password) => {
    const response = await axios.post(`${baseUrl}/login`, { username, email, password})
    return response.data
}

const getAllUsers = async () => {
    const response = await axios.get(`${baseUrl}/user`)
    return response.data
}

const getUser = async (id) => {
    const response = await axios.get(`${baseUrl}/user/${id}`)
    return response.data
}

const getUserBook = async (id) => {
    const response = await axios.get(`${baseUrl}/user/${id}/book`)
    return response.data
}

const addUserBook = async (user_id, book_id, status) => {
    const payload = { user_id, book_id, status }
    const response = await axios.post(`${baseUrl}/user/book`, payload)
    return response.data
}

const updateUserBook = async (user_id, book_id, status) => {
    const payload = { user_id, book_id, status }
    const response = await axios.put(`${baseUrl}/user/book`, payload)
    return response.data
}

const deleteUserBook = async (user_id, book_id) => {
    const payload = { user_id, book_id }
    const response = await axios.delete(`${baseUrl}/user/book`, payload)
    return response.data
}


export default {login, register, getAllUsers, getUser, getUserBook, addUserBook, updateUserBook, deleteUserBook}