
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Cart from './components/cart/Cart';
import DataProvider from './context/DataProvider';
import {BrowserRouter,Routes,Route, useLocation} from 'react-router-dom'
import Details from './components/details/Details';
import { Box ,CircularProgress} from '@mui/material';
import { useContext } from 'react';
import { DataContext } from './context/DataProvider';
import PaymentSuccess from './payment/PaymentSuccess';
import PaymentCancel from './payment/PaymentCancel';
import Orders from './components/MyOrders/Orders';

function AppContent() {
   const { isLoading } = useContext(DataContext);
   const location=useLocation()
   const hideHeader=location.pathname.includes('/payment/')
  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
<>
{!hideHeader && 
 <Header/>}
 <Box style={{marginTop:54}}>

 <Routes>
  
 <Route path='/' element={<Home/>}/>
 <Route path='/product/:id' element={ <Details/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/payment/success' element={<PaymentSuccess/>}/>
  <Route path='/payment/cancel' element={<PaymentCancel/>}/>
  <Route path='/orders' element={<Orders/>}/>
  
 </Routes>
 </Box>
 </>
  );
}

function App(){
return(
  <BrowserRouter>
  <DataProvider>
    <AppContent/>
  </DataProvider>
  </BrowserRouter>
)
}

export default App;
