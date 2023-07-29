import { createSlice } from "@reduxjs/toolkit";

export const UserAuth = createSlice({
    name: "Client",
    initialState: {
        Token: null,
    },
    reducers: {
        UserLogin(state, action) {
            state.Token = action.payload.token;
        },
        UserLogout(state, action) {
            state.Token = "";
        },
    },
});


export const { UserLogin,UserLogout} = UserAuth.actions;
export const UserReducer= UserAuth.reducer;