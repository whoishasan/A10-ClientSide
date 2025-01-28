import { Checkbox } from "@/components/ui/checkbox";
import Form from "@/components/ui/Form";
import { Input, InputPass } from "@/components/ui/Input";
import { Link } from "react-router-dom";
import SocialSignIn from "../../components/ui/SocialSignIn";
import { CgSpinner } from "react-icons/cg";
import { useContext, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { PiSpinnerGapThin } from "react-icons/pi";
import toast from "react-hot-toast";
import { IoCheckmarkOutline } from "react-icons/io5";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/firebase.config";
import { ErrorCodes } from "@/ErrorCodes";
import { AuthContext } from "@/context/AuthContext";

const Register = () => {
  const { setauthInfo, authInfo } = useContext(AuthContext);
  const [isLoading, setisLoading] = useState();
  const uploadAvatar = useRef();
  const [isUploading, setisUploading] = useState(false);
  const [Avatar, setAvatar] = useState();

  const handelRegister = (e) => {
    e.preventDefault();
    setisLoading(true);
    const formData = e.target;
    const name = formData.name.value;
    const email = formData.email.value;
    const password = formData.password.value;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const isValidLength = password.length >= 6;

    if (!isValidLength) {
      toast.error("Password must be 6 characters");
      setisLoading(false);
      return;
    }

    if (!hasUpperCase) {
      toast.error("Password Must Uppercase Letter");
      setisLoading(false);
      return;
    }

    if (!hasLowerCase) {
      toast.error("Password must lowercase letter");
      setisLoading(false);
      return;
    }

    if (!name) {
      toast.error("Please Give Your Name");
      return;
    }
    if (!email) {
      toast.error("Provide your Email");
      return;
    }
    if (!password) {
      toast.error("Enter a Secure Password");
      return;
    }
    if (!Avatar.url) {
      toast.error("Uplaod a Avatar");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: Avatar.url,
        }).then((user) => {
          setauthInfo({
            ...authInfo,
            displayName: name,
            photoURL: Avatar.url,
          });
          toast.success("Register Succesfull");
        });
      })
      .catch((err) => {
        toast.error(ErrorCodes[err.code]);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const handelUploadImage = async () => {
    const fileDetail = uploadAvatar.current.files[0];

    if (!uploadAvatar.current?.files[0]) {
      toast.error("Please select an image first!");
      return;
    }

    if (
      fileDetail.type !== "image/jpeg" &&
      fileDetail.type !== "image/png" &&
      fileDetail.type !== "image/webp"
    ) {
      toast.error("Only PNG, JPEG, and WEBP formats are supported.");
      return;
    }

    setisUploading(true);

    const file = uploadAvatar.current.files[0];
    const dataFile = new FormData();
    dataFile.append("file", file);
    dataFile.append("upload_preset", "Crowd Stream");
    dataFile.append("cloud_name", "dhuydj1lg");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dhuydj1lg/image/upload`,
        {
          method: "POST",
          body: dataFile,
        }
      );
      const upload = await response.json();
      setAvatar({ url: upload.secure_url });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setisUploading(false);
    }
  };

  return (
    <>
      <section className="flex justify-center bg-pattern">
        <div className="w-primary py-60 lg:h-screen px-5 flex justify-center items-center">
          <Form
            heading={"Register To Crowd Stream"}
            onSubmit={handelRegister}
            des={"Welcome! Please Register to continue"}
          >
            <div className="w-full px-5 pt-2 flex flex-col gap-5">
              <Input name="name" placeholder="Full Name" />
              <Input name="email" placeholder="Email Address" />
              <InputPass name="password" placeholder="Password" />
              <input
                ref={uploadAvatar}
                onChange={handelUploadImage}
                id="avtar"
                type="file"
                className="hidden"
              />
              <label
                htmlFor="avtar"
                className="w-full p-5 border flex items-center gap-5 cursor-pointer text-lg rounded-xl dark:border-border-1 dark:bg-slate-800 bg-slate-100"
              >
                {isUploading ? (
                  <PiSpinnerGapThin size={25} className="animate-spin" />
                ) : Avatar?.url ? (
                  <IoCheckmarkOutline size={25} />
                ) : (
                  <BsUpload size={25} />
                )}{" "}
                {isLoading
                  ? "Uploading..."
                  : Avatar?.url
                  ? "Upload Succes"
                  : "upload Image"}
              </label>
              <div className="flex w-full justify-between py-2 -mb-5">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept All Terms & Condition
                  </label>
                </div>
              </div>
              <button
                disabled={isLoading}
                type="submit"
                className="w-full py-2 flex justify-center gap-2 px-5 mt-2 bg-green-500 hover:bg-green-800 rounded-xl text-white"
              >
                {isLoading && <CgSpinner className="animate-spin" size={20} />}
                Register
              </button>
              <span className="w-full h-[1px] dark:bg-border-1 bg-border-2"></span>
              <SocialSignIn />
              <span className="w-full h-[1px] dark:bg-border-1 bg-border-2"></span>
              <p className="text-center">
                Already have an account{" "}
                <Link className="text-green-500" to={"/auth/login"}>
                  Login
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Register;
