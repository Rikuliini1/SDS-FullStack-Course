import axios from 'axios'

// Register a new user (3/3)
const registerUser = async (userData) => {
    const response = await axios.post('/api/users/register_user', userData)
    return response.data
}

// Login user (3/3)
const loginUser = async (userData) => {
    const response = await axios.post('/api/users/login_user', userData)
    localStorage.setItem('token', JSON.stringify(response.data.token))
    return response.data
}

// Logout user (3/3)
const logoutUser = () => {
    localStorage.removeItem('token')
    return 'User logged out'
}

const userService = { registerUser, loginUser, logoutUser }

export default userService

// EOF
