import { useSelector } from "react-redux"
import { Box, Button, Grid, Typography,styled } from "@mui/material"
import EmptyCart from "./EmptyCart"
import PriceView from "./PriceView"
import CartItem from "./CartItem"
import axios from "axios"
import { stripePromise } from "../../payment/Stripe"


axios.defaults.withCredentials=true

const Main=styled(Box)`
background-color:#f2f2f2;

`

const LeftComponent=styled(Grid)(({theme})=>({
 paddingRight: '20px', 
    [theme.breakpoints.down('md')]: {
        paddingRight: '0px', 
        marginBottom: '20px'
    }
}));
const Component=styled(Grid)(({theme})=>({
 padding :'30px 135px',
 width:'100%',
   [theme.breakpoints.down(1400)]: { 
        padding: '30px 80px',
    },
    [theme.breakpoints.down('lg')]: { 
        padding: '30px 50px',
    },
    [theme.breakpoints.down('md')]: { 
        padding: '20px 20px',
    },
    [theme.breakpoints.down('sm')]: {
        padding: '15px 8px', 
    }
}));

 

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
`;
const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;
const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: #fb641b;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;

const Cart = () => {
    const url='http://localhost:8000'
    const { cartItems } = useSelector(state => state.cart)

    const handlePlaceOrder=async ()=>{
        try{
            sessionStorage.setItem('payment_initiated','true')
            const {data} =await axios.post(`${url}/payment/create-checkout-session`,{
            products:cartItems
            
        })
        const stripe= await stripePromise
        await stripe.redirectToCheckout({sessionId:data.id})
        }catch(error){
            console.log('Stripe cart checkout error',error)
        }
    }
    return (
        <Main>

 
            {
                cartItems.length ?
               
                    <Component container >
                        <LeftComponent item lg={9} md={7} sm={12} xs={12} >
                            <Header>
                                <Typography style={{fontWeight: 600, fontSize: 18}}>My Cart ({cartItems?.length})</Typography>
                            </Header>
                            {
                                cartItems.map(item=>(
                                    <CartItem item={item}/>
                                ))
                            }
                            <BottomWrapper>
                                <StyledButton onClick={handlePlaceOrder}>Place the order</StyledButton>
                            </BottomWrapper>

                        </LeftComponent>
                        <Grid item lg={3} md={5} sm={12} xs={12}>
                        <PriceView cartItems={cartItems}/>
                    </Grid>
               
                    </Component>
        
                    : <EmptyCart />

            }

              </Main>
    )
}

export default Cart