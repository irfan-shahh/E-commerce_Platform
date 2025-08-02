import axios from "axios";
import { useState,createContext,useEffect } from "react";

export const DataContext=createContext(null)
const url='http://localhost:8000'

const DataProvider=({children})=>{
    const [name,setName]=useState('')
    const[user,setUser]=useState(null)
    const[isLoading,setIsLoading]=useState(true)

    const checkAuthStatus=async()=>{
        try{
         const response= await axios.get(`${url}/verify`,{withCredentials:true})
         if(response.status===200){
            setUser(response.data.user)
            setName(response.data.user.name)
         }
        }catch(error){
           setName('')
            setUser(null)  
        }
        finally{
            setIsLoading(false)
        }
    }
    const logout=async()=>{
        try{
            await axios.post(`${url}/logout`)
            setUser(null)
            setName('')

        }catch(error){
            console.log('error while logging out',error)
        }
    }

        useEffect(() => {
        checkAuthStatus();
    }, []);


return(
   <DataContext.Provider value={{name,setName,setUser,user,logout,checkAuthStatus,isLoading}}>
    {children}
   </DataContext.Provider>
)
}

export default DataProvider;