import { UserState } from "./user-state"
import { loginUser, registerUser, checkAuth, logoutUser } from "./user-actions"
import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    user: {
        username: '',
        password : '',
	    email: '',
	    first_name: '',
	    last_name: '',
	    middle_name: '',
	    organization: ''
    },
    isAuth: false,
    isLoading: false,
    access : '',
    refresh : ''
} as UserState


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuth = true
                state.access = action.payload.access || ''
                state.refresh = action.payload.refresh || ''
                state.isLoading = false;
                console.log('login')
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuth = false
                state.isLoading = false;
                console.log('register good')
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isAuth = false
                state.user.username = undefined
                state.user.password = undefined
                state.user.email = undefined
                state.user.first_name = undefined
                state.user.last_name = undefined
                state.user.middle_name = undefined
                state.user.organization = undefined
                state.access = '';
                state.refresh = '';
                state.isLoading = false;

            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuth = true
                state.access = action.payload.access || ''
                state.refresh = action.payload.refresh || ''
                state.isLoading = false;
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
    }
})

export default userSlice.reducer