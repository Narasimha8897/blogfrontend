import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import { getCurrentUserDetail, isLoggedIn } from '../auth'

function UserProvider({children}) {
    const [user,setUser]=useState({
        data:{},
        islogin:false
    })
    useEffect(()=>{
        setUser({
            data:getCurrentUserDetail(),
            islogin:isLoggedIn()
        })
    },[])
  return (
    <UserContext.Provider value={{user,setUser}}>
            {children}
    </UserContext.Provider>
  )
}

export default UserProvider