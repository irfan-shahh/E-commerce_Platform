import { Box, Typography, styled } from '@mui/material';
import { useState,useEffect } from 'react';


const Main=styled(Box)(({theme})=>({

[theme.breakpoints.up('lg')]: { 
        marginLeft: '0px', 
    },
   
    [theme.breakpoints.between('md', 'lg')]: { 
        marginLeft: '0px', 
        marginTop: '0px',
    },
   
    [theme.breakpoints.down('md')]: { 
        marginLeft: '0px',
        marginTop: '20px', 
    }
}));

const Header = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    borderBottom: 1px solid #f0f0f0;
`;

const Heading = styled(Typography)`
    color: #878787;
`;

const Container = styled(Box)`
    padding: 15px 24px;
    background: #fff;
    & > p {
        margin-bottom: 20px;
        font-size: 14px;
        
    }
`;

const Price = styled(Typography)`
    float: right;
`;

const TotalAmount = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    border-top: 1px dashed #e0e0e0;
    padding: 20px 0;
    border-bottom: 1px dashed #e0e0e0;
`;

const Discount = styled(Typography)`
    font-size: 16px; 
    color: green;
`

const PriceView = ({cartItems}) => {
    const [price,setPrice]=useState(0)
    const [discount,setDiscount]=useState(0)

    const totalAmount=()=>{
       let totalprice=0,totaldiscount=0
       cartItems.map(item=>{
        const qty=item.quantity ||1
        totalprice +=item.price.mrp *qty;
        totaldiscount +=(item.price.mrp-item.price.cost)*qty
       })
       setPrice(totalprice)
       setDiscount(totaldiscount)
    }

    useEffect(()=>{
        totalAmount()
    },[cartItems,])
  return (
         < Main>  
            <Header>
                <Heading>PRICE DETAILS</Heading>
            </Header>
            <Container>
                <Typography>Price
                    <Price component="span">₹{price}</Price>
                </Typography>
                <Typography>Discount
                    <Price component="span">-₹{discount}</Price>
                </Typography>
                <Typography>Delivery Charges
                    <Price component="span">₹40</Price>
                </Typography>
                <TotalAmount>Total Amount
                    <Price>₹{price-discount +40}</Price>
                </TotalAmount>
                <Discount>You will save ₹{discount-40} on this order</Discount>
            </Container>
        </ Main>
  )
}

export default PriceView