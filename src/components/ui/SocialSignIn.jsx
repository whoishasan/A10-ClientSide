import { auth } from "@/firebase.config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { CgSpinner } from "react-icons/cg";
import { ErrorCodes } from "@/ErrorCodes";
import toast from "react-hot-toast";

const SocialSignIn = () => {

    const [isLoading, setisLoading] = useState(false);

    const googleProvider = new GoogleAuthProvider()

    const handelGoogle = () => {
        setisLoading(true)

        signInWithPopup(auth, googleProvider)
            .then((result) => {
                toast.success('Login Succesful')
            })
            .catch((err) => {
                toast.error(ErrorCodes[`${err.code}`])
            })
            .finally(() => {
                setisLoading(false)
            })
    }

    return (
        <>
            <button onClick={handelGoogle} type="button" className="flex justify-center w-full bg-white text-black py-2 px-5 rounded-[50px] items-center gap-2 border hover:rounded-xl transition-all">
                {
                    isLoading
                        ? <CgSpinner className="animate-spin" size={25} />
                        : <FcGoogle size={25}/>
                }
                Continue With Google
            </button>
        </>
    );
}

export default SocialSignIn