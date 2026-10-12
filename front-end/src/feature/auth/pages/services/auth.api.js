import axios from "axios"

const api = axios.create({
    // baseURL: "https://interview-master-8fs9.onrender.com",
    baseURL:"http://localhost:3000",
    withCredentials: true
})

export async function register({email, username, name, password}){

    try{ 
const response = await api.post('/api/auth/register',{
    username,email,name,password
})
return response.data
}catch(err){
console.log(err)
}
}


export async function login({email, password}){
const response = await api.post('/api/auth/login',{
    email,password
})
return response.data
}


export async function logout(){

    try{ 
const response = await  api.get('/api/auth/logout')
return response.data
}catch(err){
console.log(err)
}
}


export async function getMe(){

    try{ 
const response = await api.get('/api/auth/get-me')
return response.data
}catch(err){
console.log("get me error",err)
}
}
