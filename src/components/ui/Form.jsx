import { Link } from "react-router-dom";
import LogoURI from "@/assets/image/logo.svg";

const Form = ({ heading, des, children, ...props }) => {
  return (
    <>
      <form
        className="border border-green-400 border-dashed dark:border-border-1 dark:bg-bg-1 space-y-3 bg-white p-5 py-10 h-fit w-full md:w-8/12 lg:w-5/12 xl:w-4/12 flex items-center flex-col"
        {...props}
      >
        <Link
          to={"/"}
          className="flex items-center gap-3 text-2xl pb-2 font-medium dark:text-white text-black"
        >
          <img width={40} src={LogoURI} alt="Logo" />
          <span className="hidden sm:block font-semibold"> Crowd Stream</span>
        </Link>
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-medium dark:text-white text-black">
            {heading}
          </h2>
          <p>{des}</p>
        </div>
        {children}
      </form>
    </>
  );
};

export default Form;
