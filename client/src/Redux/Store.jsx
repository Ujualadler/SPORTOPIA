import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage"; 

import { UserReducer } from "./userAuth"; 
import { TurfReducer } from "./turfAuth";
import { AdminReducer } from "./adminAuth";

const persistConfig = {
    key: 'user',
    storage: storage
}

const persistedUserReducer = persistReducer(persistConfig, UserReducer)
const persistedTurfReducer = persistReducer(persistConfig, TurfReducer)
const persistedAdminReducer = persistReducer(persistConfig, AdminReducer)

export const Store = configureStore({
    reducer: {
        User: persistedUserReducer,
        Turf: persistedTurfReducer,
        Admin: persistedAdminReducer,
    }
})

export const persistor = persistStore(Store)
