
import { useState, useCallback, useEffect } from "react";

const storageName = 'userData'

export const useAuth = ()=>{
  const [ready, setReady] = useState(false) 
  const [userId, setUserId] = useState(null) 
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)


  const login = useCallback((id, userFirstName, userLastName)=>{
    setUserId(id) 
    setFirstName(userFirstName)
    setLastName(userLastName)


    localStorage.setItem(storageName, JSON.stringify({
      userId: id, firstName: userFirstName, lastName: userLastName
    }))
  }, [])


  const logout = useCallback(()=>{
    setUserId(null) 
    setFirstName(null)
    setLastName(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem(storageName))

    if(data && data.userId){
      login(data.userId, data.firstName, data.lastName)
    }
    setReady(true)

  },[login])

  return {login, logout, userId, firstName, lastName, ready}
}