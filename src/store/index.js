import {configureStore} from '@reduxjs/toolkit'
import userReducer from './fetchSlice'

export default configureStore ({
    reducer: {
        user: userReducer,
    }
})