import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sling as Hamburger } from "hamburger-react";
import ThemeMode from "../ui/ThemeMode";
import { AuthContext } from "@/context/AuthContext";
import { Skeleton } from "../ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CiLogout } from "react-icons/ci";
import { Logout } from "../../hooks/Logout";
import LogoURI from "@/assets/image/logo.svg";

const Header = () => {
  const [menuIsOpen, setmenuIsOpen] = useState(false);
  const { authInfo, isLoading } = useContext(AuthContext);

  return (
    <>
      <header className="w-full fixed flex justify-center border-b dark:border-border-1 dark:bg-bg-1 bg-white z-[9999]">
        <div className="w-primary px-5 py-4 flex justify-between items-center">
          <Link
            to={"/"}
            className="flex items-center gap-3 text-2xl font-medium dark:text-white text-black lg:w-2/12"
          >
            <img width={40} src={LogoURI} alt="Logo" />
            <span className="hidden sm:block font-semibold">Crowd Stream</span>
          </Link>
          <menu
            className={`dark:bg-bg-1 hidden flex-col lg:flex-row w-full fixed left-0 justify-center backdrop-blur-3xl top-[79px] text-sm border-b dark:border-border-1 lg:!animate-none ${
              menuIsOpen && "!flex"
            } lg:flex lg:static lg:border-none lg:!w-7/12`}
          >
            <nav className="flex  flex-col w-full mb-5 px-2 lg:p-0 lg:flex-row lg:justify-center lg:mb-0 gap-1 lg:gap-2 lg:mr-5">
              {MenuData &&
                MenuData.map((li, index) => (
                  <NavLink
                    key={index}
                    to={li.path}
                    className={({ isActive }) =>
                      `${
                        isActive && `text-green-500 font-semibold`
                      } w-full  px-3 py-2 hover:text-green-800 rounded-md lg:w-fit transition-colors`
                    }
                  >
                    {li?.pathName}
                  </NavLink>
                ))}
            </nav>
            <div className="w-full py-5 border-t sm:hidden dark:border-border-1 px-5">
              {isLoading ? (
                <Skeleton
                  className={`w-[187px] h-[32px] rounded-full !bg-slate-400`}
                />
              ) : !authInfo ? (
                <div className="flex flex-col w-full gap-1">
                  <Link to={"/auth/login"}>
                    <button className="bg-green-500 text-white px-5 py-1 rounded-md w-full hover:bg-white hover:text-black transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link to={"/auth/register"}>
                    <button className="bg-green-800 text-white px-5 py-1 rounded-md w-full hover:bg-white hover:text-black  transition-colors">
                      Register
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="w-full p-2 py-1 rounded-lg flex items-center gap-2">
                  <Avatar className="scale-75 ring-2 ring-green-500 hover:ring-4">
                    <AvatarImage
                      src={authInfo?.photoURL}
                      alt={authInfo?.displayName}
                    />
                    <AvatarFallback>
                      {authInfo?.displayName?.toUpperCase()?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex justify-between w-full items-center">
                    <div>
                      <p className="dark:text-white font-medium capitalize">
                        {authInfo?.displayName}
                      </p>
                      <p className="text-[10px]">{authInfo?.email}</p>
                    </div>
                    <button onClick={Logout}>
                      <CiLogout
                        className="cursor-pointer outline-none"
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Logout"
                        size={20}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </menu>
          <div className="flex items-center gap-5 lg:w-2/12 lg:h-10 justify-end z-20">
            <div>
              <ThemeMode />
            </div>
            <div className="hidden sm:block">
              {isLoading ? (
                <Skeleton
                  className={`w-[192px] h-[32px] rounded-full !bg-slate-400`}
                />
              ) : !authInfo ? (
                <div className="flex items-center">
                  <Link to={"/auth/login"}>
                    <button className="bg-green-500 text-white px-5 py-1  hover:bg-black hover:dark:bg-white hover:dark:text-black transition-colors">
                      Login
                    </button>
                  </Link>
                  <Link to={"/auth/register"}>
                    <button className="bg-green-800 text-white px-5 py-1 hover:bg-black border-dashed border-2 hover:dark:bg-white hover:dark:text-black  transition-colors">
                      Register
                    </button>
                  </Link>
                </div>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="outline-none cursor-pointer"
                    data-tooltip-id="tooltip"
                    data-tooltip-content="Click"
                  >
                    <Avatar className="scale-75 ring-2 mt-1 ring-green-500 hover:ring-4">
                      <AvatarImage
                        src={authInfo?.photoURL}
                        alt={authInfo?.displayName}
                      />
                      <AvatarFallback>
                        {authInfo?.displayName?.toUpperCase()?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="dark:bg-bg-1 border dark:border-border-1 z-[9999999999999999]">
                    <DropdownMenuLabel className="dark:text-text-1 text-sm px-2 py-0 font-normal capitalize text-text-2">
                      {authInfo?.displayName}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="dark:!bg-border-1 !bg-border-2" />
                    <button
                      onClick={Logout}
                      className="w-full text-start px-2 text-sm flex items-center gap-2 dark:hover:bg-slate-800 rounded-md"
                    >
                      <CiLogout />
                      Logout
                    </button>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div
              data-tooltip-id="tooltip"
              data-tooltip-content="Navbar"
              className="lg:hidden"
            >
              <Hamburger
                size={25}
                onToggle={(toggled) => {
                  toggled ? setmenuIsOpen(true) : setmenuIsOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

const MenuData = [
  { pathName: "Home", path: "/" },
  { pathName: "All Campaign", path: "/campaigns" },
  { pathName: "Add New Campaign", path: "/addcampaign" },
  { pathName: "My Campaign", path: "/mycampaign" },
  { pathName: "My Donations", path: "/mydonations" },
];
