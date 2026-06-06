import { createSlice } from "@reduxjs/toolkit";

let cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            let existingItem = state.find(item => item.name === action.payload.name)
            if (existingItem) {
                existingItem.quantity += 1;
            }
            else {
                let finalObject = { ...action.payload, quantity: 1 };
                state.push(finalObject);
            }
        },
        removeCart: (state, action) => {

            let index = state.findIndex(item => item.name === action.payload.name);

            if (index != -1) {
                state.splice(index, 1);
            }

        },
        clearCart: () => { return [] }
    }
});




//export the reducer then imported by component  
export const { addToCart, removeCart, clearCart } = cartSlice.actions;

//Export the slice then imported by store 
export default cartSlice.reducer