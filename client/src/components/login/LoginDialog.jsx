import { Box, styled, Button, Dialog, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { userAuthenticate } from "../../services/api";
import { authenticateLogin } from "../../services/api";
import { clearAuthRequired } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
const Component = styled(Box)`
    height:90vh;
    width: 90vh;
    padding: 0;
    padding-top: 0;
`;

const Image = styled(Box)`
    background: #2874f0 url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png) center 85% no-repeat;
    width: 26%;
    height: 81.5%;
    padding: 45px 35px;
    & > p, & > h5 {
        color: #FFFFFF;
        font-weight: 600
    }
`;
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    & > div, & > button, & > p {
        margin-top: 20px;
    }
`
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`;
const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
`;
const CreateAccount = styled(Typography)`
    margin: auto 0 5px 0;
    text-align: center;
    color: #2874f0;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer
`
const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`
const signupInitialValues = {
    name: '',
    email: '',
    phone: '',
    password: ''
}
const loginInitialValues = {
    email: '',
    password: ''
}


const LoginDialog = ({ open, setOpen,onClose }) => {

    const dispatch=useDispatch()
    const { setName,setUser } = useContext(DataContext)
    const [account, setAccount] = useState('login')
    const [signup, setSignup] = useState(signupInitialValues)
    const [login, setLogin] = useState(loginInitialValues)
    const [error, setError] = useState(false)
  

    const toggleAccount = () => {
        setAccount(prev => (prev === 'login' ? 'register' : 'login'))
        setError(false)
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value })
    }

    const onValueChange = (e) => {
        setLogin({ ...login, [e.target.name]: e.target.value })
    }

    const closeDialog = () => {
    setOpen(false);
    if (onClose) onClose();
    }

    const userSignup = async () => {
        let response = await userAuthenticate(signup)

        if (!response) return;
        if (response && response.status === 200) {
            setSignup(signupInitialValues)
           toggleAccount()   

        }
    }

    const userLogin = async () => {
        setError(false)
        try {
            const response = await authenticateLogin(login)
            if (response && response.status === 200) {
                setUser(response.data.user);
                setName(response.data.user.name);
                dispatch(clearAuthRequired())
                closeDialog()
            }

        } catch (error) {
            console.error('Login error:', error);
            setError(true)
        }

    }

    return (

        <Dialog open={open}
            onClose={closeDialog}>
            <Component style={{ display: 'flex' }}>
                <Image>
                    <Typography variant="h5">{account === 'login' ? ' Login' : 'Looks like you are new here!'}</Typography>
                    <Typography style={{ marginTop: 20, }}>
                        {
                            account === 'login' ? 'Get access to your Orders, Wishlist and Recommendations' : 'Sign up with your Email to get started'
                        }
                    </Typography>
                </Image>

                <Wrapper>
                    {
                        account === 'login' ? (
                            <>
                                <TextField variant='standard' onChange={(e) => onValueChange(e)} name='email' label='Enter your Email'></TextField>
                                {error && <Error>Please enter valid Email/Password</Error>}
                                <TextField variant='standard' onChange={(e) => onValueChange(e)} name="password" label='Enter your Password' type="password"></TextField>
                                <Text>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Text>
                                <LoginButton onClick={userLogin}>Login</LoginButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <CreateAccount onClick={toggleAccount}>New to Flipkart? Create an account</CreateAccount>

                            </>
                        ) : (
                            <>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name="name" label='Enter your Name'></TextField>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='email' label='Enter your Email'></TextField>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name="phone" label='Enter your phone'></TextField>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label='Enter your Password' type="password"></TextField>
                                <LoginButton onClick={userSignup}>Signup</LoginButton>
                                <Text style={{ textAlign: 'center' }}>OR</Text>
                                <CreateAccount onClick={toggleAccount}>Already have an account ? Login</CreateAccount>

                            </>
                        )
                    }

                </Wrapper>
            </Component>
        </Dialog>
    )
}

export default LoginDialog