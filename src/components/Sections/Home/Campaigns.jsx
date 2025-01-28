import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import Button from "../../ui/Button";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Campaigns = () => {
  const [campaignsData, setcampaignsData] = useState(null);
  const [campaignLimit, setcampaignLimit] = useState(6);

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/campaigns?limit=${6}`)
      .then((res) => res.json())
      .then((data) => {
        setcampaignsData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <section className="flex justify-center border-t dark:border-border-1 overflow-x-hidden">
        <div className="w-primary px-5 pt-20 flex flex-col justify-center items-start">
          <div className="w-full flex flex-wrap justify-between items-center border-b pb-5 dark:border-border-1 gap-4">
            <div
              data-aos="fade-right"
              data-aos-anchor-placement="top-bottom"
              className="space-y-1"
            >
              <h2 className="text-3xl font-semibold">Latest Campaign</h2>
              <p>Crowd Stream All Active Crowdfunding Campaigns</p>
            </div>
            <div
              className="hidden sm:flex"
              data-aos="fade-left"
              data-aos-anchor-placement="top-bottom"
            >
              <Link to={"/addcampaign"}>
                <Button>
                  <p className="hidden sm:block">Add new campaign</p>
                  <IoMdAdd size={20} />
                </Button>
              </Link>
            </div>
            <div className="block sm:hidden w-full text-right">
              <Link to={"/addcampaign"}>
                <Button className={`w-full`}>
                  <p className="block">Add new campaign</p>
                  <IoMdAdd size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center border-b pb-20 dark:border-border-1">
        <div className="w-full grid grid-cols-12 gap-6 sm:gap-8 lg:gap-10 pt-10 overflow-hidden px-4 sm:px-6 w-primary">
          {!campaignsData
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="col-span-12 sm:col-span-6 lg:col-span-4 border dark:bg-bg-1 bg-white rounded-3xl dark:border-border-1 p-6 sm:p-8"
                >
                  <Skeleton className="w-full h-[200px] !bg-slate-200 rounded-2xl"></Skeleton>
                  <div className="pt-5 flex flex-col gap-3">
                    <Skeleton className="w-full h-[32px] !bg-slate-200"></Skeleton>
                    <Skeleton className="w-full h-[10px] !bg-slate-200"></Skeleton>
                    <Skeleton className="w-9/12 h-[10px] !bg-slate-200"></Skeleton>
                    <Skeleton className="h-[47px] w-full rounded-xl !bg-slate-200"></Skeleton>
                  </div>
                </div>
              ))
            : campaignsData.map((camp, index) => (
                <Link
                  key={index}
                  data-aos="fade-up"
                  data-aos-anchor-placement="top-bottom"
                  className="transition-all group col-span-12 sm:col-span-6 lg:col-span-4 border dark:bg-bg-1 bg-white rounded-3xl dark:border-border-1 p-6 sm:p-8"
                  to={`./campaign/${camp?._id}`}
                >
                  <div className="rounded-2xl overflow-hidden">
                    <div
                      style={{ backgroundImage: `url('${camp?.thumb}')` }}
                      className="w-full group-hover:scale-110 transition-all bg-slate-200 duration-500 bg-cover h-[200px] rounded-2xl dark:border-none dark:border-border-1"
                    ></div>
                  </div>
                  <div className="pt-5 flex flex-col gap-3">
                    <h2 className="dark:text-white text-xl font-medium">
                      {camp?.title.slice(0, 50)}{" "}
                      {camp?.title.length > 49 && (
                        <span className="font-light text-sm dark:text-stone-200 text-black">
                          ..see more
                        </span>
                      )}
                    </h2>
                    <p
                      className="text-base"
                      dangerouslySetInnerHTML={{
                        __html:
                          camp?.description.slice(0, 130) ||
                          "No description available",
                      }}
                    />
                    <button className="flex group justify-center items-center gap-2 w-full py-2 mt-5 px-5 dark:bg-border-1 rounded-xl border dark:border-border-1 text-base font-medium bg-slate-900 text-white">
                      See more
                      <LiaExternalLinkAltSolid
                        className="group-hover:translate-x-2 group-hover:-translate-y-1 transition-all"
                        size={20}
                      />
                    </button>
                  </div>
                </Link>
              ))}
        </div>
      </section>
    </>
  );
};

export default Campaigns;
