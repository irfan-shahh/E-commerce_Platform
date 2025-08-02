
import { Box ,Button,styled} from "@mui/material"
import { useEffect } from "react"
import { useSearchParams,useNavigate } from "react-router-dom"
const Container=styled(Box)`
   display:flex;
   height:70vh;
   align-items:center;
   justify-content:center;
`
const PaymentCancel = () => {
  const navigate=useNavigate()
  const [searchParams]=useSearchParams()

  useEffect(()=>{
    const sessionId=searchParams.get('session_id')
    const fromPayment=sessionStorage.getItem('payment_initiated')
   if(!sessionId || !fromPayment){
     navigate('/',{replace:true})
     return
    }
    sessionStorage.removeItem('payment_initiated')
   
  },[searchParams,navigate])
  
  return (
    <Container>
          <Box>

        <h1>Payment Failed ❌</h1>
        <Button variant="contained" style={{padding:'10px', width:'300px'}} onClick={()=>navigate('/',{replace:true})}>Go to home</Button>
          </Box>
      

    </Container>
  )
}

export default PaymentCancel