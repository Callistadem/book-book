import axios from 'axios'
const baseUrl = 'http://localhost:8080';

const getAllBooks = async () => {
    const response = await axios.get(`${baseUrl}/book`) 
    return response.data
}

const getBook = async (id) => {
    const response = await axios.get(`${baseUrl}/book/${id}`) 
    return response.data
}

const addBook = async (title, author, cover) => {
    const payload = { title, author, cover }
    const response = await axios.post(`${baseUrl}/book`, payload)
    return response.data
}

export default { getAllBooks,  getBook, addBook }