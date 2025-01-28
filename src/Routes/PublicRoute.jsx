import Loading from "@/components/Sections/Home/Loading"
import { AuthContext } from "@/context/AuthContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"

const PublicRoute = ({children}) => {
    
    const { authInfo, isLoading } = useContext(AuthContext)
    if(isLoading){
        return <Loading />
    }

    if(!authInfo){
        return children
    }

    return <Navigate to={'/'} />
}

export default PublicRoute