import axios from 'axios'

axios.defaults.withCredentials=true;

const url='http://localhost:8000'

export const userAuthenticate=async (data)=>{
    try{

    let response= await axios.post(`${url}/signup`,data)
    return response;
    }catch(error){
        console.log('error while signing up',error)
    }
}

export const authenticateLogin= async (data)=>{
    try{
        let response= await axios.post(`${url}/login`,data)
        return response;
    }catch(error){
     console.log('error while logging in',error)
 
    }
}
