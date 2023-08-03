import { configureStore,combineReducers } from "@reduxjs/toolkit";
import userAuthslice from "./Reducers/userAuthslice";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
import tutorSlice from "./Reducers/tutorSlice";

const rootReducer=combineReducers({
    tutorInfo:tutorSlice
})

const persistConfig = {
    key: 'root', // Key for the root of the state in local storage
    storage, // Storage engine to use (e.g., localStorage)
  
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  


const store=configureStore({
    reducer:persistedReducer})

    const persistor = persistStore(store)

export {persistor,store}