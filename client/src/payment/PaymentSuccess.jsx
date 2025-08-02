import { useDispatch } from "react-redux"
import {  useEffect, useState } from "react"
import { resetCart } from "../redux/actions/cartActions"
import { Box ,styled,Button} from "@mui/material"
import { useSearchParams,useNavigate } from "react-router-dom"
import axios from "axios"
const Container=styled(Box)`
   display:flex;
   height:70vh;
   align-items:center;
   justify-content:center;
`

const PaymentSuccess = () => {
  const url='http://localhost:8000'
    const dispatch=useDispatch()
    const [searchParams]=useSearchParams()
    const navigate=useNavigate()

    const[validPayment,setValidPayment]=useState(false)
     const [orderDetails, setOrderDetails] = useState(null);
        const [loading, setLoading] = useState(true);
    

    useEffect(()=>{
      const verifyPayment=async ()=>{
      try{
      const sessionId=searchParams.get('session_id')
      const fromPayment = sessionStorage.getItem('payment_initiated');
      if(!sessionId || !fromPayment){
        navigate('/',{replace:true})
        return;
      }
      const response=await axios.post(`${url}/payment/verify-session`,{
        sessionId
      },{withCredentials:true})

      if( response.status===200  && response.data.success){
        setValidPayment(true)
        setOrderDetails(response.data.orderDetails)
        sessionStorage.removeItem('payment_initiated')
        dispatch(resetCart())
      }else{
        navigate('/',{replace:true})
      }
      }catch(error){
        console.log('Payment verification failed:', error);
        navigate('/',{replace:true})
      } finally{
        setLoading(false)
      }
    }
  
      verifyPayment()
 

    },[dispatch,navigate,searchParams,url])
    
  if (loading){
    return (
      <Box>
        <h1>Verifying payment</h1>
      </Box>
    )
  }
  if(!validPayment){
    return null
  }
  return (
    <Container>
        <Box>
       <h1> Payment Successful ✅ </h1>
       <Button variant="contained" style={{padding:'10px', width:'300px'}} onClick={()=>navigate('/',{replace:true})}>Continue shopping</Button>
        </Box>
    </Container>
  )
}

export default PaymentSuccess