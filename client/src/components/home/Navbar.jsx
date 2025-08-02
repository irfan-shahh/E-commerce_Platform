import { Box, styled, Typography } from "@mui/material"
import { navData } from "../../constants/data"

const Container=styled(Box)(({theme})=>({
  display:'flex',
  margin:'55px 30px 0 30px;!important',
  justifyContent:'space-between',
  [theme.breakpoints.down('lg')]:{
    margin:'0px'
  }
}))

const Component=styled(Box)`
      padding:12px 8px;
      text-align:center;
`
const Text=styled(Typography)`
   font-size:14px;
   font-weight:600;
   font-family:inherit;
`

const Navbar = () => {
  return (
    <Container>
      {
        navData.map(data=>(
            <Component>
                <img src={data.url} alt="navdata" />
                <Text>{data.text}</Text>
            </Component>
        ))
      }
    </Container>
  )
}

export default Navbar