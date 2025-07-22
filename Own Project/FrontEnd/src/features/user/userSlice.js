import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import userService from './userService'

// Get user from localStorage
const token = JSON.parse(localStorage.getItem('token'))

const initialState = {
    isLoggedIn: token ? true : false,
    userLoading: false,
    justRegistered: false,
    justLoggedIn: false,
    justLoggedOut: false,
    gotUserError: false,
    userMessage: ''
}

// Register a new user (2/3)
export const registerUser = createAsyncThunk('user/register', async (userData, thunkAPI) => {
    try {
        return await userService.registerUser(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// Login user (2/3)
export const loginUser = createAsyncThunk('user/login', async (userData, thunkAPI) => {
    try {
        return await userService.loginUser(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// Logout user (2/3)
export const logoutUser = createAsyncThunk('user/logout', async (_, thunkAPI) => {
    return userService.logoutUser()
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUserState: (state) => {
            state.userLoading = false
            state.justRegistered = false
            state.justLoggedIn = false
            state.justLoggedOut = false
            state.gotUserError = false
            state.userMessage = ''
        }
    }, extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.userLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.justRegistered = true
                state.userMessage = action.payload.successMessage
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.gotUserError = true
                state.userMessage = action.payload.errorMessage
            })
            .addCase(loginUser.pending, (state) => {
                state.userLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.justLoggedIn = true
                state.isLoggedIn = true
                state.userMessage = action.payload.successMessage
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.gotUserError = true
                state.userMessage = action.payload.errorMessage
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.justLoggedOut = true
                state.isLoggedIn = false
                state.userMessage = action.payload
            })
    }
})

export const { resetUserState } = userSlice.actions
export default userSlice.reducer

// EOF
