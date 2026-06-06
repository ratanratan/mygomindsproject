import { createSlice } from "@reduxjs/toolkit";
import { coupons } from "./cupon";

const cuponSlice = createSlice({
    name: "cupon",
    initialState: {
        code: "",
        discount: 0,
        applied: false,
        message: "",
    },
    reducers: {
        applyCoupon: (state, action) => {
            const enteredCode = action.payload.toUpperCase();
            //In the cupons the code is present 
            if (coupons[enteredCode]) {
                state.code = enteredCode;
                state.discount = coupons[enteredCode]
                state.applied = true;
                state.message = `Coupon "${enteredCode}" applied! You got ${coupons[enteredCode]}% off.`;
            }
            else {
                state.message = `Invalid coupon code.`;
                state.applied = false;
                state.discount = 0;
            }
        },

        resetCoupon: (state) => {
            state.code = "";
            state.discount = 0;
            state.applied = false;
            state.message = "";
        }
    }
})

//export the reducer then imported by component  
export const { applyCoupon, resetCoupon } = cuponSlice.actions;

//Export the slice then imported by store 
export default cuponSlice.reducer