import Loading from "@/components/Sections/Home/Loading"
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { Navigate, useLocation } from "react-router-dom"

const PrivateRoute = ({children}) => {
    
    const { authInfo, isLoading } = useContext(AuthContext)
    const location = useLocation()

    if(isLoading){
        return <Loading />
    }

    if(authInfo){
        return children
    }

    return <Navigate state={location.pathname} replace={true} to={'/auth/login'} />
}

export default PrivateRoute