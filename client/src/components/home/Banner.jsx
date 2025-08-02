
import { Box,styled } from "@mui/material";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import { bannerData } from "../../constants/data";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Image=styled('img')(({theme})=>({
    width:'100%',
    height:280,
    [theme.breakpoints.down('md')]:{
      objectFit:'cover',
      height:180
    }
}))
const Banner = () => {
  return (
    <Box>
   <Carousel
  responsive={responsive} 
  swipeable={false}
  draggable={false}
  showStatus={false}
  showDots={false}
  
//   infinite={true}
//   autoPlay={true}
  autoPlaySpeed={4000}

  >
    {
      bannerData.map(data=>(
   <Image src={data.url} alt="banner"/>    
      ))
    }
   </Carousel>
    </Box>
  )
}

export default Banner