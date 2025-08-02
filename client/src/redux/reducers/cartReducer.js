import * as actionType from '../constants/cartConstants'
export const cartReducer=(state={cartItems:[],authRequired:false},action)=>{
    switch(action.type){

        case actionType.ADD_ITEMS_TO_CART:
            const item=action.payload
            const exist=state.cartItems.find(product=>product.id===item.id)
            if(exist){
           return {...state,cartItems:state.cartItems.map(data=>data.product===exist.product ?item:data),
        
           }
            }
            else{
                return {...state,cartItems:[...state.cartItems,item],
                    
                }
            }

        case actionType.REMOVE_ITEMS_FROM_CART:
            return {...state,cartItems:state.cartItems.filter(product=>product.id!==action.payload)}

        case actionType.AUTH_REQUIRED:
            return {
                ...state,authRequired:true
            }

            case actionType.CLEAR_AUTH_REQUIRED:
                return{
                    ...state,authRequired:false
                }

            case actionType.UPDATE_CART_ITEM_QUANTITY:
                return{
                    ...state,cartItems:state.cartItems.map(item=>
                        item.id===action.payload.id ? {...item,quantity:action.payload.quantity}:item
                    )
                }
            case actionType.RESET_CART:{
                return{
                    cartItems:[]
                }
            }
            default:
                return state;
    }
}