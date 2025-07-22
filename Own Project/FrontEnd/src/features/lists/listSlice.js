import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { logoutUser } from '../user/userSlice'
import listService from './listService'

const initialState = {
    lists: [],
    listsLoading: false,
    justGotLists: false,
    justCreatedList: false,
    justDeletedList: false,
    gotListError: false,
    listMessage: ''
}

// Create a new list (2/3)
export const createList = createAsyncThunk('lists/create', async (listData, thunkAPI) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        return await listService.createList(listData, token)
    } catch (error) {
        if (error.response.status === 401) {
            // Token is invalid or expired
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue({ errorMessage: 'User unauthorized' })
        } else {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
})

// Get all lists (2/3)
export const getLists = createAsyncThunk('lists/get', async (_, thunkAPI) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        return await listService.getLists(token)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// Delete a list (2/3)
export const deleteList = createAsyncThunk('lists/delete', async (listId, thunkAPI) => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        const response =  await listService.deleteList(listId, token)
        return { listId, successMessage: response.successMessage }
    } catch (error) {
        if (error.response.status === 401) {
            // Token is invalid or expired
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue({ errorMessage: 'User unauthorized' })
        } else {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
})

const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {
        resetListState: (state) => {
            state.listsLoading = false
            state.justGotLists = false
            state.justCreatedList = false
            state.justDeletedList = false
            state.gotListError = false
            state.listMessage = ''
        },
        clearLists: (state) => {
            state.lists = []
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(createList.fulfilled, (state, action) => {
                state.justCreatedList = true
                state.lists.push(action.payload.list)
                state.listMessage = action.payload.successMessage
            })
            .addCase(createList.rejected, (state, action) => {
                state.gotListError = true
                state.listMessage = action.payload.errorMessage
            })
            .addCase(getLists.pending, (state) => {
                state.listsLoading = true
            })
            .addCase(getLists.fulfilled, (state, action) =>{
                state.justGotLists = true
                state.lists = action.payload
            })
            .addCase(getLists.rejected, (state, action) =>{
                state.gotListError = true
                state.listMessage = action.payload.errorMessage
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                state.justDeletedList = true
                state.listMessage = action.payload.successMessage
                state.lists = state.lists.filter((list) => list._id !== action.payload.listId)
            })
            .addCase(deleteList.rejected, (state, action) => {
                state.gotListError = true
                state.listMessage = action.payload.errorMessage
            })
    }
})

export const { resetListState, clearLists } = listSlice.actions
export default listSlice.reducer

// EOF
