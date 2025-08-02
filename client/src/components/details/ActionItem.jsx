

import { Button, Box, styled } from '@mui/material';
import { ShoppingCart as Cart, FlashOn as Flash, } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemstoCart } from '../../redux/actions/cartActions';
import { useState,useContext } from 'react';
import LoginDialog from '../login/LoginDialog';
import { DataContext } from '../../context/DataProvider';
import axios from 'axios';
import { stripePromise } from '../../payment/Stripe';

axios.defaults.withCredentials=true
const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('md')]: {
        padding: '20px 40px'
    }
}))


const ImageBox=styled(Box)`
   width:45%,
   padding: '15px 20px',
   border: '1px solid #F2F2F2',
  
`

const StyledButton = styled(Button)(({theme})=>({
width: '48%',
    borderRadius: '2px',
    height: '50px',
    color: '#FFF',
[theme.breakpoints.down('md')]:{
    width: '85%',
    marginTop:'10px'
}
}))
    

const ActionItem = ({product}) => {
const navigate=useNavigate()
const dispatch=useDispatch()
const {user}=useContext(DataContext)
const [openLogin,setOpenLogin]=useState(false)
const url='http://localhost:8000'


const [quantity,setQuantity]=useState(1)

    const addItemToCart=()=>{
        if(!user){
            setOpenLogin(true)
            return;     
        }
        else{
            dispatch(addItemstoCart(product.id,quantity))
            navigate('/cart')
        }

    }
    
    const handleBuyNow=async ()=>{
         if(!user){
            setOpenLogin(true)
            return;     
        }else{

        try{
            sessionStorage.setItem('payment_initiated','true')
            const {data}= await axios.post(`${url}/payment/create-checkout-session`, {
                products:[{...product,quantity:1}]
            },{withCredentials:true})
            const stripe= await stripePromise
            await stripe.redirectToCheckout({sessionId:data.id})
                
        }catch(error){
          console.log('erorr while creating a checkout ',error)
        }
    }
}
  return (
  <>
      <LeftContainer>
        <ImageBox>
            <img src={product?.detailUrl}  style={{ width: '75%' }} alt='img' /><br />
        </ImageBox>
            <StyledButton  style={{marginRight: 10, background: '#ff9f00'}} variant="contained" onClick={addItemToCart}><Cart />Add to Cart</StyledButton>
            <StyledButton style={{background: '#fb641b'}} variant="contained"
           onClick={handleBuyNow} ><Flash /> Buy Now</StyledButton>
        </LeftContainer>
        <LoginDialog open={openLogin} setOpen={setOpenLogin}/>
        </>
  )
}

export default ActionItem