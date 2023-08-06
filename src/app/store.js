import { configureStore } from "@reduxjs/toolkit";
import fetchEmailsSlice from "./slices/fetchEmailsSlice";
const store = configureStore({
    reducer:{
        fetchedData:fetchEmailsSlice
    }
})

export default store