import {useContext, useEffect} from 'react'
import { AuthContext } from '../auth.context'
import { login,register,logout,getMe } from '../pages/services/auth.api'
import { useNavigate } from 'react-router'

export const useAuth=() =>{
    const context = useContext(AuthContext)
    const navigate = useNavigate()
    const {user, setUser, loading, setLoading} = context

    const handleLogin = async({email, password}) =>{
        setLoading(true)
        try{
        const data = await login({email, password}) 
        setUser(data.user)
        }catch(err){
            console.log("handle login error : ",err)
        } finally{
        setLoading(false)
        }
    }

     const handleRegister = async({email,username,name, password}) =>{
        setLoading(true)

        try{
        const data = await register({email,username,name, password}) 
        setUser(data.user)
        return data
        }catch(err) {
            console.log("handle register error : ",err)
        }finally{
        setLoading(false)
        }
    }

     const handleLogout = async() =>{
        setLoading(true)
        try{
        const data = await logout() 
        setUser(null)
        navigate('/login')
        }catch(err){
            console.log("handle logout error : ",err)
               }finally{
        setLoading(false)
               }
    }

   useEffect(()=>{
        const getAndSetUser = async() =>{
            try{
            const data = await getMe()
            setUser(data.user)
            }catch(err){
                console.log(err,`error in getting user information`)
            }finally{
            setLoading(false)
            }
        }
        getAndSetUser()
    }, [setUser,setLoading])

    return {user, loading, handleLogin ,handleRegister, handleLogout}
}