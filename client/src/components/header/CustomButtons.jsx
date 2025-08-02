
import { Box, Typography, Button, styled,Badge} from '@mui/material';
import { ShoppingCart,} from '@mui/icons-material';
import LoginDialog from '../login/LoginDialog';
import { useState,useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import Profile from './Profile';
import {Link,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';


const Wrapper=styled(Box)(({theme,isdrawer})=>({
  display:'flex',
  alignItems:'center',
  margin:'0 3% 0 auto',
  '& > button, & > p ,& > div':{
  marginRight:'40px',
  fontSize:'16px',
},
...(!isdrawer && {
[theme.breakpoints.down('md')]:{
  display:'none'
}
})
}))
  
  

const LoginButton=styled(Button)`
 color:#2874f0;
 background-color:#fff;
 text-transform:none;
 padding:5px 40px;
 border-radius:4px;
 box-shadow:none;
 font-weight:600;
 height:32px;
 margin-left:50px;
`
const Container=styled(Link)`
display:flex;
`
const CustomButtons = ({isdrawer}) => {

  const navigate=useNavigate()
  const {cartItems}=useSelector(state=>state.cart)
    const {name,setName}=useContext(DataContext)
    const[open,setOpen]=useState(false)

    const toggleDialog=()=>{
        setOpen(true)
    }

  return (
   
    <Wrapper isdrawer={isdrawer}
    sx={{
      flexDirection: isdrawer ? 'column':'row'
    }}>
        {
            name ? <Profile name={name} setName={setName}/>: <LoginButton variant='contained' onClick={toggleDialog}>Login</LoginButton>
        }
       
        <Button style={{ marginTop: 3, width: 135, color:'#ffff', textTransform:'none'}} onClick={()=>navigate('/orders')}>My orders</Button>
            <Typography style={{ marginTop: 3 }}>More</Typography>
            <Container to='/cart' style={{color:'#ffff', textDecoration:'none'} } >
            <Badge badgeContent={cartItems?.length} color='secondary'>

                <ShoppingCart/>
            </Badge>
                <Typography>Cart</Typography>
            </Container>
            <LoginDialog open={open}
            setOpen={setOpen}/>
    </Wrapper>
      
  )
}

export default CustomButtons