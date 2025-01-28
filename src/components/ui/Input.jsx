import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";

const Input = ({ className, ...props }) => {
  return (
    <>
      <input
        className={`w-full bg-transparent outline-none px-5 py-2 border dark:border-border-1 focus:ring-2 dark:ring-green-500 ring-green-500 ${className}`}
        {...props}
      />
    </>
  );
};

const InputPass = ({ className, ...props }) => {
  const [isPassword, setisPassword] = useState(true);

  return (
    <>
      <div>
        <input
          type={isPassword ? "password" : "text"}
          className={`w-full bg-transparent outline-none px-5 py-2 border dark:border-border-1 focus:ring-2 dark:ring-green-400 ring-green-500 ${className}`}
          {...props}
        />
        <div className="w-full flex justify-end -mt-7 px-5">
          <button
            onClick={() => {
              setisPassword(!isPassword);
            }}
            type="button"
            className="text-xl cursor-pointer"
          >
            {isPassword ? <VscEye /> : <VscEyeClosed />}
          </button>
        </div>
      </div>
    </>
  );
};

export { Input, InputPass };
