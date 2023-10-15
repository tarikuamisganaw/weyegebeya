import {createSlice} from '@reduxjs/toolkit'

import swal from 'sweetalert';
const initialState={
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[],
    cartTotalQuantity:0,
    cartTotalPrice:0
}

const cartSlice=createSlice({
name:"cart",
initialState,
reducers:{
    addCart(state,action){
        const itemIndex=state.cartItems.findIndex((item)=>item.id===action.payload.id)
        if(itemIndex>=0){
            if (state.cartItems[itemIndex].cartQunatity < action.payload.product_amount) {
                state.cartItems[itemIndex].cartQunatity+=1
              }
             else{ swal ("product amount exceeded ")}

        }
        else{
            const tempProduct={...action.payload,cartQunatity:1}
            state.cartItems.push(tempProduct)
        }
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))

    },
    removeFromCart(state,action){
        const updatedCart = state.cartItems.filter((product) => product.id !== action.payload.id);
        state.cartItems=updatedCart
        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },
    decreaseQuantity(state,action){
        const itemIndex=state.cartItems.findIndex((product)=>product.id === action.payload.id)
        if(state.cartItems[itemIndex].cartQunatity >1 ){
            state.cartItems[itemIndex].cartQunatity-=1
        }else if(state.cartItems[itemIndex].cartQunatity===1){
            const updatedCart = state.cartItems.filter((product) => product.id !== action.payload.id);
        state.cartItems=updatedCart
        
        }

        localStorage.setItem("cartItems",JSON.stringify(state.cartItems))
    },
    clearCart(state) {
        state.cartItems = [];
        state.cartTotalQuantity = 0;
        state.cartTotalPrice = 0;
        localStorage.removeItem("cartItems");
      }
      
}


})

export const {addCart,removeFromCart,decreaseQuantity, clearCart}=cartSlice.actions
export default cartSlice.reducer