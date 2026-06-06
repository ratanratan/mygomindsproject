import { createSlice } from "@reduxjs/toolkit";

let OrdersSlice = createSlice({
    name: "orders",
    initialState: [],
    reducers: {
        addOrder: (state, action) => {
            state.push(action.payload);
        },
    },
});

//export the reducer then imported by component  
export const { addOrder } = OrdersSlice.actions;

//Export the slice then imported by store 
export default OrdersSlice.reducer