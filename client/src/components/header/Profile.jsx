import { Box, styled,Menu, MenuItem, Typography } from '@mui/material'
import { PowerSettingsNew } from '@mui/icons-material';
import { useState ,useContext,} from 'react';
import { DataContext } from '../../context/DataProvider';
import { useDispatch } from 'react-redux';
import { clearAuthRequired } from '../../redux/actions/cartActions';
import { resetCart } from '../../redux/actions/cartActions';
const Component = styled(Menu)`
    margin-top: 5px;
`;

const Logout = styled(Typography)`
    font-size: 14px;
    margin-left: 20px;
`;
const Profile = ({name,setName}) => {
    const [open,setOpen]=useState(false)
    const {logout}=useContext(DataContext)

    const dispatch=useDispatch()
const handleClick=(event)=>{
    setOpen(event.currentTarget)
}
 const handleClose = () => {
        setOpen(false);
    };

    const logoutUser=()=>{
        logout()
        dispatch(clearAuthRequired())
        dispatch(resetCart())
    }
  return (
  <Box>
    <Typography  onClick={handleClick} style={{margin:'2px 7px', fontWeight:600, textDecoration:'underline', cursor:'pointer'}} >{name}</Typography>
<Component
anchorEl={open}
open={open}
onClose={handleClose}>
    <MenuItem onClick={()=>{handleClose();logoutUser()}}>
     <PowerSettingsNew fontSize='small' color='primary'/> 
    <Logout>Logout</Logout>
    </MenuItem>
</Component>
  </Box>
  )
}

export default Profile