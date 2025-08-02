// import { useState,useContext } from "react"
// import LoginDialog from "../login/LoginDialog"
// import { useSelector,useDispatch } from "react-redux"
// import { useEffect } from "react"
// import { clearAuthRequired } from "../../redux/actions/cartActions"
// import { DataContext } from "../../context/DataProvider"


// const AuthHandler = () => {
  
//     const[openLogin,setOpenLogin]=useState(false)
//     const {user}=useContext(DataContext)

//     const {authRequired}=useSelector(state=>state.cart)
//     const dispatch=useDispatch()
//     useEffect(()=>{
//         if(authRequired){ 
//           if(!user)  
//             setOpenLogin(true)
//         }
//     },[authRequired])

//     const handleCloseLogin=()=>{
//       setOpenLogin(false)
//        dispatch(clearAuthRequired())
//     }
//   return (
//     <LoginDialog open={openLogin} setOpen={setOpenLogin} onClose={handleCloseLogin}/>
//   )
// }

// export default AuthHandler