import { Box, Typography, styled, Button, Divider } from '@mui/material'
import "react-multi-carousel/lib/styles.css";
import Carousel from 'react-multi-carousel'
import Countdown from 'react-countdown';
import {Link} from 'react-router-dom'



const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    }
};

const Component = styled(Box)`
    margin-top: 10px;
    background: #FFFFFF;
`;

const Deal = styled(Box)`
    display: flex;    
    padding: 15px 20px;
`

const DealText = styled(Typography)`
    font-size: 22px;
    font-weight: 600;
    line-height: 32px;
    margin-right: 25px;

`
const Image = styled('img')({
    width: 'auto',
    height: 30
})

const Timer = styled(Box)`
    color: #7f7f7f;
    margin-left: 10px;
    display: flex;
    align-items: center;
`;

const ViewAllButton = styled(Button)`
    margin-left: auto;
    background-color: #2874f0;
    border-radius: 2px;
    font-size: 13px;
    color:#fff;
    font-weight:600;
`;
const ProductImage = styled('img')({
    width: 'auto',
    height: 150
})

const Text = styled(Typography)`
    font-size: 14px;
    margin-top: 5px
`


const Slide = ({ products, title, timer }) => {
    const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
    const renderer = ({ hours, minutes, seconds }) => {
        return <Box variant='span'>
            {hours}:{minutes}:{seconds} left
        </Box>
    }
    return (
        <Component>
            <Deal>
                <DealText>{title}</DealText>
                {
                    timer && <Timer>
                        <Image src={timerURL} alt="time" />
                        <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                         </Timer>
                }

                <ViewAllButton >View All</ViewAllButton>
            </Deal>
            <Divider />
            <Carousel
                responsive={responsive}
                swipeable={true}
                draggable={true}
                showStatus={false}
                showDots={false}
                keyBoardControl={true}
                centerMode={true}
                infinite={true}>

                {
                    products?.map(product => (
                        <Link to={`/product/${product.id}`} style={{textDecoration:'none'}}>
                        <Box textAlign='center' style={{ padding: '25px 15px' }}>
                            <ProductImage src={product.url} alt='product' />
                            <Text style={{ fontWeight: 600, color: '#212121' }}>{product.title.shortTitle}</Text>
                            <Text style={{ color: 'green' }}>{product.discount}</Text>
                            <Text style={{ color: "#212121", opacity: '0.6' }}>{product.tagline}</Text>
                        </Box>
                        </Link>

                    ))
                }

            </Carousel>
        </Component>

    )
}

export default Slide