import { AuthContext } from "@/context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { JackInTheBox } from "react-awesome-reveal";
import Heart from "@/assets/image/heart.png";
import { Link } from "react-router-dom";
import moment from "moment";
import { Skeleton } from "@/components/ui/skeleton";
import { Helmet } from "react-helmet-async";

const MyDonations = () => {
  const { isLoading, authInfo } = useContext(AuthContext);
  const [myDonatedData, setmyDonatedData] = useState();

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/mydonations?ownerUID=${
        authInfo?.uid
      }`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setmyDonatedData(data);
      });
  }, [isLoading, authInfo]);

  return (
    <>
      <Helmet>
        <title>My Donations | Crowd Stream</title>
      </Helmet>
      <section className="flex justify-center">
        <div className="w-primary pt-28 px-5 overflow-y-hidden">
          <div className="w-full p-7 md:p-10 border bg-pattern dark:border-border-1 flex justify-between items-center rounded-3xl flex-col lg:flex-row">
            <div data-aos="fade-up" className="space-y-2 z-20">
              <h2 className="dark:text-white text-3xl md:text-4xl font-semibold">
                My All Donations
              </h2>
              <p className="text-sm md:text-base">
                You Can See when Some details about your donations{" "}
                <strong>
                  Created At, <br />
                  Donation Ammount , Campaign Details
                </strong>
              </p>
            </div>
            <JackInTheBox>
              <img
                width={100}
                src={Heart}
                alt="Power"
                className="animate-pulse opacity-40 lg:opacity-100 -mt-20 lg:m-0 z-10"
              />
            </JackInTheBox>
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="w-primary grid grid-cols-12 gap-5 px-5 pt-10 pb-20">
          {myDonatedData ? (
            myDonatedData?.length > 0 ? (
              myDonatedData.map((donation, index) => (
                <Link
                  to={`../campaign/${donation?.campaign?._id}`}
                  key={index}
                  className={`w-full border lg:gap-5 dark:border-border-1 border-border-2 col-span-12 md:col-span-6 lg:col-span-4 rounded-xl flex flex-col`}
                >
                  <div
                    className={`p-10 bg-slate-200 py-40 w-full rounded-t-xl lg:rounded-none lg:!rounded-xl lg:!rounded-b-none`}
                    style={{
                      backgroundImage: `url('${donation?.campaign?.thumb}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                  <div
                    className={`p-10 gap-3 flex flex-col items-start w-full`}
                  >
                    <h2 className="dark:text-white text-xl sm:text-2xl font-semibold">
                      {donation?.campaign?.title || "This Campaign Was Deleted"}
                    </h2>
                    <p
                      className="text-sm sm:text-base"
                      dangerouslySetInnerHTML={{
                        __html:
                          donation?.campaign?.description.slice(0, 150) ||
                          "This Donated Campaign Deletd By Campaign Owner",
                      }}
                    />
                    <div className="flex items-center flex-wrap gap-3">
                      <span
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Donation Ammount"
                        className="dark:bg-slate-800 px-4 py-1 rounded-md border dark:border-border-1 text-xs sm:text-sm"
                      >
                        {donation?.ammount}$
                      </span>
                      <span
                        data-tooltip-id="tooltip"
                        data-tooltip-content="Donated At"
                        className="dark:bg-slate-800 px-4 py-1 rounded-md border dark:border-border-1 text-xs sm:text-sm"
                      >
                        {moment(donation?.createdAt).format(
                          "dddd, MMMM DD, YYYY"
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-12 space-y-3 flex flex-col items-start bg-slate-100 border dark:border-border-1 dark:bg-slate-800 p-10 rounded-xl">
                <h2 className="text-3xl dark:text-white">
                  Your No Donation History Was Found
                </h2>
                <Link to={`../campaigns`}>
                  <button className="bg-green-500 text-white px-5 rounded-md py-1">
                    Donate campaign
                  </button>
                </Link>
              </div>
            )
          ) : (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-full border dark:border-border-1 col-span-12 md:col-span-6 lg:col-span-4 rounded-xl flex flex-col"
              >
                <div className="w-full rounded-t-xl lg:rounded-xl lg:rounded-b-none">
                  <Skeleton className="h-full py-40 w-full rounded-t-xl lg:rounded-xl lg:rounded-b-none" />
                </div>
                <div className="p-5 gap-3 flex flex-col items-start w-full">
                  <Skeleton className="h-6 w-3/4 rounded" />
                  <Skeleton className="h-4 w-full rounded" />
                  <div className="flex items-center flex-wrap gap-3">
                    <Skeleton className="h-4 w-20 rounded" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};

export default MyDonations;
