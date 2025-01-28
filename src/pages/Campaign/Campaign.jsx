import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Notfound from "../Notfound/Notfound";
import { Helmet } from "react-helmet-async";
import { FaHeart } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Terminal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { JackInTheBox } from "react-awesome-reveal";
import Tick from "@/assets/image/tick.png";
import { ImSpinner3 } from "react-icons/im";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthContext } from "@/context/AuthContext";

const Campaign = () => {
  const { isLoading, authInfo } = useContext(AuthContext);
  const { id } = useParams();
  const [campaign, setCampaign] = useState();
  const [donated, setdonated] = useState(false);
  const [isLoadingIcon, setisLoadingIcon] = useState(false);
  const [isDeadlineExpired, setisDeadlineExpired] = useState(true);
  const date = new Date();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/campaign?campId=${id}`)
      .then((res) => res.json())
      .then((data) => setCampaign(data));
  }, [id]);

  useEffect(() => {
    if (campaign?.deadline) {
      verifyDeadline();
    }
  }, [campaign]);

  const verifyDeadline = () => {
    const [year, month, day] = campaign.deadline.split("-").map(Number);

    if (
      year > date.getFullYear() ||
      (year === date.getFullYear() && month > date.getMonth() + 1) ||
      (year === date.getFullYear() &&
        month === date.getMonth() + 1 &&
        day > date.getDate())
    ) {
      setisDeadlineExpired(false);
    } else {
      setisDeadlineExpired(true);
    }
  };

  const handelDonation = (e) => {
    e.preventDefault();
    setisLoadingIcon(true);
    const minAmmount = e.target.doyaloBektirDan;

    if (isDeadlineExpired) {
      toast.error("Campaign Not Active Now");
      return;
    }
    if (minAmmount.value < campaign?.minAmmount) {
      toast.error(`Min ammount ${campaign?.minAmmount}$`);
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("CampId", campaign?._id);
    urlencoded.append("OwnerUID", authInfo?.uid);
    urlencoded.append("Ammount", minAmmount.value);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donation`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        e.target.reset();
        if (!data.errors) {
          setdonated(data);
        } else {
          toast.error("Something Went Wrong");
        }
      })
      .finally(() => {
        setisLoadingIcon(false);
      });
  };

  if (!isLoading) {
    if (campaign?.code === 404) {
      return <Notfound />;
    }
  }

  if (!campaign?._id) {
    return (
      <section className="flex justify-center">
        <div className="w-primary flex justify-between flex-col lg:flex-row items-start py-24 px-5 gap-5">
          <div className="bg-pattern p-8 w-full lg:w-8/12 border dark:border-border-1 rounded-3xl">
            <div className="w-full rounded-2xl h-[300px] bg-cover bg-no-repeat md:h-[400px] flex justify-center dark:border-border-1 items-end border">
              <Skeleton className="w-1/3 h-8 mb-4" />
            </div>

            <Skeleton className="w-full h-12 mt-10" />

            <form className="w-full mt-10 lg:w-4/12 border p-10 dark:border-border-1 space-y-5 rounded-3xl block lg:hidden">
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
              <Skeleton className="w-full h-12" />
            </form>

            <Skeleton className="mt-10 w-full h-12" />

            <div className="mt-10 p-5 px-8 dark:bg-bg-1 w-full dark:border-border-1 border gap-x-10 gap-y-5 flex justify-between items-center rounded-xl flex-wrap">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-32 h-6" />
              <Skeleton className="w-24 h-6" />
            </div>

            <Skeleton className="mt-5 w-full h-12" />

            <div className="mt-5 p-5 dark:bg-bg-1 w-full dark:border-border-1 border rounded-xl space-y-3">
              <Skeleton className="w-1/2 h-8" />
              <Skeleton className="w-full h-6" />
              <Skeleton className="w-full h-4" />
            </div>
          </div>

          <Skeleton className="w-full lg:w-4/12 border p-10 dark:border-border-1 space-y-5 rounded-3xl hidden lg:block" />
        </div>
      </section>
    );
  }

  if (campaign?._id) {
    const createdAt = new Date(campaign.createdAt);

    return (
      <>
        <Helmet>
          <title>{campaign?.title || "Not Found | Crowd Stream"}</title>
          <meta property="og:image" content={campaign?.thumb} />
        </Helmet>
        {donated && (
          <section className="w-full fixed h-screen items-center flex justify-center z-[999] bg-[#1b1b1b43] px-10     py-40">
            <div className="z-[999999] flex space-y-5 flex-col items-center p-10 justify-center w-full lg:w-5/12 2xl:w-[500px] bg-white  dark:bg-slate-800 dark:border-border-1 rounded-2xl">
              <div className="w-full flex justify-end">
                <IoMdClose
                  onClick={() => setdonated(false)}
                  size={26}
                  className="dark:hover:bg-slate-700 hover:bg-slate-200 cursor-pointer rounded-md"
                />
              </div>
              <JackInTheBox>
                <img width={100} src={Tick} alt="Tick" />
              </JackInTheBox>
              <div className="text-center">
                <h2 className="text-2xl dark:text-white font-medium">
                  Donation Succesfull
                </h2>
                <p>See your donation here</p>
                <Link onClick={() => setdonated(false)} to={`../mydonations`}>
                  <button className="mt-5 dark:bg-slate-700 px-5 py-2 border dark:border-border-1 rounded-[70px] hover:rounded-xl transition-all">
                    See See Donation
                  </button>
                </Link>
              </div>
            </div>
          </section>
        )}
        <section className="flex justify-center">
          <div className="w-primary flex justify-between flex-col lg:flex-row items-start py-24 px-5 gap-5">
            <div className="bg-pattern p-8 w-full lg:w-8/12 border dark:border-border-1 rounded-3xl">
              <div
                className="w-full rounded-2xl h-[300px] bg-cover bg-no-repeat md:h-[400px] flex justify-center dark:border-border-1 items-end border"
                style={{ backgroundImage: `url('${campaign?.thumb}')` }}
              >
                <button
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Category"
                  className="capitalize backdrop-blur px-5 rounded-t-2xl bg-white dark:bg-bg-1 py-1 -mb-1"
                >
                  {campaign?.category?.split("-").join(" ")}
                </button>
              </div>
              <form
                onSubmit={handelDonation}
                className="w-full mt-10 lg:w-4/12 border p-10 dark:border-border-1 space-y-5 rounded-3xl block lg:hidden"
              >
                {isDeadlineExpired ? (
                  <Alert className="bg-[#f4c0c051]" variant="destructive">
                    <AlertCircle className="h-6 w-6" />
                    <AlertTitle className="ml-2 !font-semibold text-lg">
                      Expired
                    </AlertTitle>
                    <AlertDescription className="ml-2 dark:text-white">
                      This campaign expired on{" "}
                      {moment(campaign?.deadline).format("dddd, MMMM DD, YYYY")}
                      .
                    </AlertDescription>
                  </Alert>
                ) : (
                  <Alert className="!bg-transparent border dark:border-border-1">
                    <AlertTitle>Campaign Deadline</AlertTitle>
                    <AlertDescription>
                      This Campaign Deadline Is{" "}
                      <strong>
                        {moment(campaign?.deadline).format(
                          "dddd, MMMM DD, YYYY"
                        )}
                      </strong>
                    </AlertDescription>
                  </Alert>
                )}
                <div>
                  <h3 className="font-medium pb-1 dark:text-white">
                    Minimum Ammount: {campaign?.minAmmount}$
                  </h3>
                  <input
                    name="doyaloBektirDan"
                    defaultValue={campaign?.minAmmount}
                    type="number"
                    className="w-full bg-transparent px-5 py-2 border dark:border-border-1 rounded-lg focus:ring-2 ring-[#2580ff63]"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox required id="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept all terms & conditions
                  </label>
                </div>
                <span className="w-full flex dark:bg-border-1 bg-border-2 h-[1px]"></span>
                <button
                  disabled={isDeadlineExpired}
                  className={`flex items-center gap-2 w-full bg-red-500 hover:bg-red-700 font-medium text-center text-white justify-center px-5 py-3 rounded-xl ${
                    isDeadlineExpired && "opacity-35"
                  }`}
                >
                  Donate
                  {!isLoadingIcon ? (
                    <FaHeart />
                  ) : (
                    <ImSpinner3 size={20} className="animate-spin" />
                  )}
                </button>
              </form>
              <div className="mt-10 p-5 px-8 dark:bg-bg-1 w-full dark:border-border-1 border gap-x-10 gap-y-5 flex justify-between items-center rounded-xl flex-wrap">
                <div className="flex items-center gap-4">
                  <img
                    src={campaign?.userAvatar}
                    className="rounded-full ring-2 ring-green-500"
                    width={50}
                    alt="Author"
                  />
                  <div>
                    <h4 className="text-xl dark:text-white">
                      {campaign?.userName}
                    </h4>
                    <p className="-mt-1">Author</p>
                  </div>
                </div>
                <button
                  data-tooltip-id="tooltip"
                  data-tooltip-content="Created At"
                  className="dark:bg-slate-800 bg-slate-200 px-5 py-2 rounded-md flex-grow sm:flex-grow-0"
                >
                  {createdAt.getFullYear()} ∘ {createdAt.getMonth() + 1} ∘{" "}
                  {createdAt.getDate()}
                </button>
              </div>
              <div className="mt-5 p-5 dark:bg-bg-1 w-full dark:border-border-1 border rounded-xl space-y-3">
                <h2 className="dark:text-white text-3xl md:text-3xl font-semibold">
                  {campaign?.title}
                </h2>
                <span className="dark:bg-border-1 bg-border-2 w-full h-[1px] flex"></span>
                <div
                  className="htmlShowcase p-3"
                  dangerouslySetInnerHTML={{
                    __html: campaign?.description || "No description available",
                  }}
                />
              </div>
            </div>
            <form
              onSubmit={handelDonation}
              className="w-full lg:w-4/12 border p-10 dark:border-border-1 space-y-5 rounded-3xl hidden lg:block"
            >
              {isDeadlineExpired ? (
                <Alert className="bg-[#f4c0c051]" variant="destructive">
                  <AlertCircle className="h-6 w-6" />
                  <AlertTitle className="ml-2 !font-semibold text-lg">
                    Expired
                  </AlertTitle>
                  <AlertDescription className="ml-2 dark:text-white">
                    This campaign expired on {campaign?.deadline}.
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="!bg-transparent border dark:border-border-1">
                  <AlertTitle>Campaign Deadline</AlertTitle>
                  <AlertDescription>
                    This Campaign Deadline Is{" "}
                    <strong>
                      {moment(campaign?.deadline).format("dddd, MMMM DD, YYYY")}
                    </strong>
                  </AlertDescription>
                </Alert>
              )}
              <div>
                <h3 className="font-medium pb-1 dark:text-white">
                  Minimum Ammount: {campaign?.minAmmount}$
                </h3>
                <input
                  name="doyaloBektirDan"
                  defaultValue={campaign?.minAmmount}
                  type="number"
                  className="w-full bg-transparent px-5 py-2 border dark:border-border-1 rounded-lg focus:ring-2 ring-[#2580ff63]"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox required id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept all terms & conditions
                </label>
              </div>
              <span className="w-full flex dark:bg-border-1 bg-border-2 h-[1px]"></span>
              <button
                disabled={isDeadlineExpired}
                className={`flex items-center gap-2 w-full bg-red-500 hover:bg-red-700 font-medium text-center text-white justify-center px-5 py-3 rounded-xl ${
                  isDeadlineExpired && "opacity-35"
                }`}
              >
                Donate
                {!isLoadingIcon ? (
                  <FaHeart />
                ) : (
                  <ImSpinner3 size={20} className="animate-spin" />
                )}
              </button>
            </form>
          </div>
        </section>
      </>
    );
  }
};

export default Campaign;
