"use client"


import { createContext, useContext, useState } from "react"

export const UserContext = createContext()

export function UserWrapper({ children }) {
  const [user, setUser] = useState("")
  

  const sharedState = {
    user, setUser
  }

  return (
    <UserContext.Provider value={sharedState}>{children}</UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
