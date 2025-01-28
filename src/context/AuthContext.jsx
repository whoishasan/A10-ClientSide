import { createContext, useState } from "react";

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
  
    const [authInfo, setauthInfo] = useState();
    const [isLoading, setisLoading] = useState(true);
    
    return (
        <AuthContext.Provider 
            value={{
                authInfo, setauthInfo,
                isLoading, setisLoading
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider, AuthContext }