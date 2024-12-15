"use client";
import { createContext, useEffect, useState } from "react";
import { restaurant_auth, user_auth } from "../helpers/helper";
export const UserContext = createContext();
const UserContextProvider = ({children}) => {
  const [user, setUser] = useState([]);
  return (
    <UserContext.Provider value={{user, setUser}} >
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider