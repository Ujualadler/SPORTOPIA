import { createSlice } from "@reduxjs/toolkit";

export const UserAuth = createSlice({
    name: "Client",
    initialState: {
        Token: null,
        UserData:null
    },
    reducers: {
        UserLogin(state, action) {
            state.Token = action.payload.token;
        },
        UserLogout(state, action) {
            state.Token = "";
        },
        GetUserData(state,action){
            console.log(action+'kkkkk')
            console.log(action.payload.userData)
            state.UserData = action.payload.userData;
        }
    },
});


export const { UserLogin,UserLogout,GetUserData} = UserAuth.actions;
export const UserReducer= UserAuth.reducer;