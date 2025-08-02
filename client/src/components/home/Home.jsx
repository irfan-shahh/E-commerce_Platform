
import { Box,styled } from "@mui/material"
import Navbar from "./Navbar"
import Banner from "./Banner"
import Slide from './Slide'
import { useSelector,useDispatch } from "react-redux"
import {getProducts} from '../../redux/actions/productActions'
import { useEffect } from "react"

const Component=styled(Box)`
   background-color:#f2f2f2;
   padding:10px

`

const Home = () => {
 const {products}= useSelector(state=>state.getProducts)

  const dispatch=useDispatch()

  useEffect(()=>{
   dispatch( getProducts())
  },[dispatch])

  return (
    <Box style={{marginTop:55}}>
        <Navbar/>
        <Component>
        <Banner/>
        <Slide products={products} title="Deal of the day" timer={true} />
        <Slide products={products} title='Top picks for you' timer={false}/>
        <Slide products={products} title='Top picks of the season' timer={false}/>
        
        </Component>
    </Box>
  )
}

export default Home