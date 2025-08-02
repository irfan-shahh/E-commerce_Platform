
import {useEffect,} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { getProductDetails } from '../../redux/actions/productActions'
import { useParams } from 'react-router-dom'
import { Box ,Typography,styled,Grid} from '@mui/material'
import ActionItem from './ActionItem'
import ProductDetails from './ProductDetails'

const Component = styled(Box)`
    margin-top: 55px;
    background: #F2F2F2;
   
`;

const Container = styled(Grid)(({ theme }) => ({
    background: '#FFFFFF',
    display:'flex',
    [theme.breakpoints.down('md')]: {
        margin: 0
    }
}))

const RightContainer = styled(Grid)`
    margin-top: 50px;
    & > p {
        margin-top: 10px;
    }
`;

const Details = () => {

     const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

    const dispatch=useDispatch()
    const {id}=useParams()
    const {product,loading}=useSelector(state=>state.getProductDetails)

 useEffect(()=>{
      dispatch(getProductDetails(id))
 },[dispatch,id])
  return (
      <Component>
            { product && Object.keys(product).length &&
                <Container container> 
                <Box style={{width:'40%'}}>

                    <Grid item lg={4} md={4} sm={8} xs={12}>
                        <ActionItem product={product} />
                    </Grid>
                </Box>
                <Box style={{width:'60%'}}>

              
                    <RightContainer item lg={8} md={8} sm={8} xs={12}>
                        <Typography>{product.title.longTitle}</Typography>
                        <Typography style={{marginTop: 5, color: '#878787', fontSize: 14 }}>
                            8 Ratings & 1 Reviews
                            <span><img src={fassured} style={{width: 77, marginLeft: 20}} /></span>
                        </Typography>
                        <Typography>
                            <span style={{ fontSize: 28 }}>₹{product.price.cost}</span>&nbsp;&nbsp;&nbsp; 
                            <span style={{ color: '#878787' }}><strike>₹{product.price.mrp}</strike></span>&nbsp;&nbsp;&nbsp;
                            <span style={{ color: '#388E3C' }}>{product.price.discount} off</span>
                        </Typography>
                        <ProductDetails product={product}/>
                    </RightContainer>
                      </Box>
                </Container>
            }   
        </Component>
  )
}

export default Details