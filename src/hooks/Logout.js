import { auth } from "@/firebase.config"
import { signOut } from "firebase/auth"
import toast from "react-hot-toast"


export const Logout = () => {
    signOut(auth)
        .then(() => {
            toast.success(`Logout succesfull`)
        })
        .catch(() => {
            toast.success(`Something went wrong`)
        })
}
