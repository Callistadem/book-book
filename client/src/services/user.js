import axios from 'axios'
const baseUrl = 'http://localhost:8080';

const login = async (email, password) => {
    const response = await axios.post(`${baseUrl}/login`, { email, password })
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data
}

const register = async (username, email, password) => {
    const response = await axios.post(`${baseUrl}/register`, { username, email, password })
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data
}

const getUser = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data
}

const getUserBook = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${baseUrl}/user/book`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data
}

const addUserBook = async (book_id, status) => {
    const token = localStorage.getItem('token');
    const payload = { status };
    const response = await axios.post(`${baseUrl}/user/book/${book_id}`, payload, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
    });
    return response.data
}

const updateUserBook = async (book_id, status) => {
    const token = localStorage.getItem('token');
    const payload = { status }
    const response = await axios.put(`${baseUrl}/user/book/${book_id}`, payload, {
        headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
        },
    });
    return response.data
}

const deleteUserBook = async ( book_id) => {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${baseUrl}/user/book/${book_id}`, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });
    return response.data
}


export default {login, register, getUser, getUserBook, addUserBook, updateUserBook, deleteUserBook}