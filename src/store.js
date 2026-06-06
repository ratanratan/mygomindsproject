import { configureStore } from "@reduxjs/toolkit";

import cartReducers from "./CartSlice"

import cuponReducers from "./CuponSlice"

import orderReducer from "./OrdersSlice"
const store = configureStore({
    reducer: {
        cart: cartReducers,
        cupon: cuponReducers,
        orders: orderReducer
    }
});

export default store;