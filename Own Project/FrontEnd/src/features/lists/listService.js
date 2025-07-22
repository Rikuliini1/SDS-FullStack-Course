import axios from 'axios'

// Create a new list (3/3)
const createList = async (listData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post('/api/lists/create_list', listData, config)
    return response.data
}

// Get all lists (3/3)
const getLists = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get('/api/lists/get_lists', config)
    return response.data
}

// Delete a list (3/3)
const deleteList = async (listId, token) => {
        const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete('/api/lists/delete_list/' + listId, config)
    return response.data
}

const listService = { createList, getLists, deleteList }

export default listService

// EOF
