import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice.js'
import listReducer from '../features/lists/listSlice.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        lists: listReducer
    }
})

export default store

// EOF
