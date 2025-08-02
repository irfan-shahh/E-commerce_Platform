import { Box,styled,Typography,Button } from '@mui/material'
import GroupButton from './GroupButton';
import { useDispatch } from 'react-redux';
import { removeItemsFromCart,updateCartItemQuantity } from '../../redux/actions/cartActions';


const Component = styled(Box)(({ theme }) => ({
    borderTop: '1px solid #f0f0f0',
    borderRadius: '0px',
    backgroundColor: '#ffff',
    display: 'flex',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: '10px',
    }
}));

const LeftComponent = styled(Box)`
    margin: 20px; 
    display: flex;
    flex-direction: column;
`;

const SmallText = styled(Typography)`
    color: #878787;
    font-size: 14px;
    margin-top: 10px;
`;

const Cost = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const MRP = styled(Typography)`
    color: #878787;
`;

const Discount = styled(Typography)`
    color: #388E3C;
`;

const Remove = styled(Button)`
    margin-top: 20px;
    font-size: 16px;
`;

const Quantity=styled(Box)`
padding:10px;
& >p{
]
}

 
`

const CartItem = ({item}) => {
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png';
    const dispatch=useDispatch()

    const removeFromCart=(id)=>{
       dispatch(removeItemsFromCart(id))
    }

    const handleIncrement=()=>{
        dispatch(updateCartItemQuantity(item.id,item.quantity+1))
    }
    const handleDecrement=()=>{
        if(item.quantity>1){
            
            dispatch(updateCartItemQuantity(item.id,item.quantity-1))
        }
    }


  return (
     <Component>
            <LeftComponent>
                <img src={item.url} style={{ height: 110, width: 110 }} />
                <GroupButton handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                quantity={item.quantity}/>
            </LeftComponent>
            <Box style={{ margin: 20 }}>
                <Typography fontSize='14px'>{item.title.longTitle}</Typography>
                <SmallText>Seller:RetailNet
                    <span><img src={fassured} style={{ width: 50, marginLeft: 10 }} /></span>
                </SmallText>
                <Typography style={{margin: '20px 0'}}>
                    <Cost component="span">₹{item.price.cost}</Cost>&nbsp;&nbsp;&nbsp;
                    <MRP component="span"><strike>₹{item.price.mrp}</strike></MRP>&nbsp;&nbsp;&nbsp;
                    <Discount component="span">{item.price.discount} off</Discount>
                </Typography>
                <Remove onClick={(id)=>removeFromCart(item.id)}>Remove</Remove>
                
            <Quantity style={{marginRight:'auto'}}>
                <Typography variant='span' style={{marginLeft:'auto'}}>Items: {item.quantity}</Typography>
                <Typography variant='span'style={{marginLeft:'auto'}}> Total Price:{item.quantity*item.price.cost}</Typography>
                </Quantity>
            </Box>
        </Component>
  )
}

export default CartItem