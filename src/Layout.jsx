import { Outlet } from "react-router-dom";
import Header from "./components/Layout/Header";
import Aos from "aos";
import "aos/dist/aos.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import { Tooltip } from "react-tooltip";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Layout/Footer";

const Layout = () => {
  Aos.init();

  const { setauthInfo, setisLoading } = useContext(AuthContext);

  useEffect(() => {
    const unSubscribe = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setauthInfo(user);
          setisLoading(false);
        } else {
          setauthInfo(null);
          setisLoading(false);
        }
      });
    };
    return unSubscribe();
  }, [setauthInfo, setisLoading]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "!rounded-full !px-5",
        }}
      />
      <Tooltip
        id="tooltip"
        style={{
          background: "#000000ab",
          borderRadius: "12px",
          zIndex: "999999999999999999",
        }}
      />
    </>
  );
};

export default Layout;
