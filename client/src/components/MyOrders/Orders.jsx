
import { Box, Typography,styled } from '@mui/material'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { DataContext } from '../../context/DataProvider'
import { useNavigate } from 'react-router-dom'
const url = 'http://localhost:8000'

const Container=styled(Box)`
   padding:10px;
   max-width:1200px;

`
const Component=styled(Box)`
   
`
const ComponentMain=styled(Box)`
    display:flex;
    margin-bottom:10px;
    gap:20px;
`
const Details=styled(Box)`
display:flex;
flex-direction:column;
 margin-top: 30px;
  margin-left: 30px;

`
const Image=styled('img')({
      width:'100px',
      height:'100px',
      
})
const ImageStyle=styled(Box)`
      width:100%;
      height:100%;
     
`



const Orders = () => {

    const [orders, setOrders] = useState([])
    const { user } = useContext(DataContext)
     const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${url}/orders`, { withCredentials: true })
            setOrders(response.data.orders || [])
        } catch (error) {
            console.log('error while fetching orders', error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => { 
        if (!user) {
            navigate('/')
            return;
        }
        fetchOrders()
    }, [user, navigate])

     if (loading) {
        return (
            <Box style={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="h6">Loading your orders...</Typography>
            </Box>
        )
    }
    return (
        <Container style={{backgroundColor:'#f2f2f2'}}>
            {
                orders?.length === 0 ? (
                    <Box >
                        <h5 style={{color:'#808080',textAlign:'center'}}>You haven't placed any orders yet. Start shopping to see your orders here!</h5>
                    </Box>
                ) : (
                    orders?.map((order) => (
                       <ComponentMain key={order._id}>

                            <Box key={order._id}>
                                

                                    {order.items.map((item,index) => (
                                        
                                        <Component style={{marginBottom:'20px'}} key={index}>
                                            <Typography style={{fontSize:'12px', fontWeight:600}}>{item.title} x {item.quantity}</Typography>
                                           <ImageStyle>

                                            <Image src={item.image} alt='image'/>
                                           </ImageStyle>
                                            
                                        </Component>
                                    ))}
                              
                              </Box>
                                  <Details key={order._id}>
                                <Typography style={{fontSize:'12px'}}>Total Amount: ₹{order.totalAmount}</Typography>
                                <Typography style={{fontSize:'12px'}}>Status: {order.status}</Typography>
                                <Typography style={{fontSize:'12px'}}>Payment: {order.paymentStatus}</Typography>
                                <Typography style={{fontSize:'12px', color:'#808080'}}>Date: {new Date(order.paidAt).toLocaleString()}</Typography>
                                 </Details>
                      

                        </ComponentMain>
                    ))
                )
            }
        </Container>
    )
}

export default Orders