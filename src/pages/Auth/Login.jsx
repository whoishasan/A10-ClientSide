import { Checkbox } from "@/components/ui/checkbox";
import Form from "@/components/ui/Form";
import { Input, InputPass } from "@/components/ui/Input";
import { Link, Navigate, useNavigate } from "react-router-dom";
import SocialSignIn from "../../components/ui/SocialSignIn";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase.config";
import { ErrorCodes } from "@/ErrorCodes";
import { useState } from "react";
import { CgSpinner } from "react-icons/cg";

const Login = () => {
  const [isLoading, setisLoading] = useState(false);

  const handelLogin = (e) => {
    setisLoading(true);
    e.preventDefault();
    const formData = e.target;
    const email = formData.email.value;
    const password = formData.password.value;

    if (!email) {
      toast.error("Invalid email address");
      setisLoading(false);
      return null;
    }

    if (!password) {
      toast.error("Enter a password");
      setisLoading(false);
      return null;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Login Succesful");
        return <Navigate state={location.pathname} replace={true} to={-1} />;
      })
      .catch((err) => {
        toast.error(ErrorCodes[`${err.code}`]);
        setisLoading(false);
      });
  };

  return (
    <>
      <section className="flex justify-center bg-pattern">
        <div className="w-primary py-60 lg:h-screen px-5 flex justify-center items-center">
          <Form
            heading={"Login To Crowd Stream"}
            onSubmit={handelLogin}
            des={"Welcome back! Please Login to continue"}
          >
            <div className="w-full px-5 pt-2 flex flex-col gap-5">
              <Input name="email" placeholder="Email Address" />
              <InputPass name="password" placeholder="Password" />
              <div className="flex w-full justify-between py-2 -mb-5">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember Me
                  </label>
                </div>
                <Link to={"/forget-password"}>Forget Password</Link>
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full py-2 flex justify-center gap-2 px-5 mt-2 bg-green-500 hover:bg-green-800 rounded-xl text-white"
              >
                {isLoading && <CgSpinner className="animate-spin" size={20} />}
                Login
              </button>
              <span className="w-full h-[1px] dark:bg-border-1 bg-border-2"></span>
              <SocialSignIn />
              <span className="w-full h-[1px] dark:bg-border-1 bg-border-2"></span>
              <p className="text-center">
                Did't have any account{" "}
                <Link className="text-green-500" to={"/auth/register"}>
                  Register
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Login;
