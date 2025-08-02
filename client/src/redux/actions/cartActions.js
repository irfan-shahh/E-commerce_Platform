import * as actionType from '../constants/cartConstants'
import axios from 'axios'
const url='http://localhost:8000'
axios.defaults.withCredentials = true;

export const addItemstoCart=(id,quantity)=>async(dispatch)=>{
         try{
           const verifyRes = await axios.get(`${url}/verify`);
         if (verifyRes.status !== 200) {
         dispatch({ type: actionType.AUTH_REQUIRED });
         return;
    }
        
           const {data}= await axios.get(`${url}/cart/product/${id}`)
           dispatch({type:actionType.ADD_ITEMS_TO_CART,payload:{...data,quantity}})
         }catch(error){

          if(error.response && (error.response.status===401 || error.response.status===403)){
            dispatch({type:actionType.AUTH_REQUIRED})
          }
          else{
            
            dispatch({type:actionType.ADD_ITEMS_TO_CART_ERROR,payload:error.message})
          }

         }
}

export const removeItemsFromCart=(id)=>async (dispatch)=>{
    dispatch({type:actionType.REMOVE_ITEMS_FROM_CART,payload:id})
}
export const updateCartItemQuantity=(id,quantity)=>(dispatch)=>{
    dispatch({type:actionType.UPDATE_CART_ITEM_QUANTITY,payload:{id,quantity}})
}
export const clearAuthRequired=()=>(dispatch)=>{
  dispatch({type:actionType.CLEAR_AUTH_REQUIRED})
}
export const resetCart=()=>(dispatch)=>{
  dispatch({type:actionType.RESET_CART})
}