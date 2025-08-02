
import { AppBar, Toolbar, Box, Typography, styled,IconButton, Drawer, List, ListItem } from '@mui/material';
import{ Menu} from '@mui/icons-material';
import CustomButtons from './CustomButtons';
import Search from './Search';
import  {Link}  from 'react-router-dom'
import { useState } from 'react';


const StyledHeader = styled(AppBar)`
    background: #2874f0;
    height: 55px;
    box-shadow:none;
`;
const Component=styled(Link)`
margin-left:12%;
line-height:0;

`

const SubHeading = styled(Typography)`
    font-size: 10px;
    font-style: italic;
`

const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginLeft: 4
})
const CustomButtonWrapper=styled(Box)`
 margin: '0 5% 0 auto', 
`

const MenuWrapper=styled(Box)(({theme})=>({
    display:'none',
    [theme.breakpoints.down('md')]:{
        display:'block'
    }
}))

const Header = () => {
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';
    const [open,setOpen]=useState(false)

    const handleOpen=()=>{
       setOpen(true)
    }
    const handleClose=()=>{
       setOpen(false)
    }

    const list=()=>{
        return (
      <Box  style={{width:250,height:'100%' ,display:'flex',flexDirection:'column'}}  > 
        <List>
            <ListItem button>
                 <CustomButtons isdrawer={true}/>
            </ListItem>
        </List>
      </Box>
        )
    }
  return (
     <StyledHeader>
            <Toolbar style={{ minHeight: 55 }}>
                <MenuWrapper>
                    <IconButton onClick={handleOpen} color='inherit'>
                        <Menu/>
                    </IconButton>
                </MenuWrapper>
                <Drawer open={open}
                onClose={handleClose}
                >{list()}
                </Drawer>

                <Component to='/'>
                    <img src={logoURL} alt='logo' style={{ width: 75 }} />
                    <Box component="span" style={{ display: 'flex' }}>
                        <SubHeading>Explore&nbsp;
                            <Box component="span" style={{color:'#FFE500'}}>
                                Plus
                            </Box>
                        </SubHeading>
                        <PlusImage src={subURL} alt='sublogo' />
                    </Box>
                </Component>
                <Search />
                <CustomButtonWrapper>
                    <CustomButtons />
                </CustomButtonWrapper>
            </Toolbar>
        </StyledHeader>
  )
}

export default Header