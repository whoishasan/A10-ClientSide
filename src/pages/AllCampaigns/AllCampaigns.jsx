import { JackInTheBox } from "react-awesome-reveal";
import TargetImage from "@/assets/image/target.png";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useRef, useState } from "react";
import { verifyDeadline } from "@/hooks/VerifyDeadline";
import moment from "moment";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { GoSortDesc } from "react-icons/go";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const AllCampaigns = () => {
  const [campData, setcampData] = useState();
  const [storedData, setstoredData] = useState();
  const [sorted, setsorted] = useState(false);
  const serachRef = useRef();

  const fetchData = () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/all`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setstoredData(data);
        setcampData(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const serachHandel = () => {
    const searchValue = serachRef.current.value.toLowerCase();
    const filterData = storedData.filter((filter) =>
      filter.title.toLowerCase().includes(searchValue)
    );
    setcampData(filterData);
  };

  const sortHandel = () => {
    const sortedData = campData.sort((a, b) => {
      if (sorted) {
        return a.minAmmount - b.minAmmount;
      } else {
        return b.minAmmount - a.minAmmount;
      }
    });
    setcampData(sortedData);
  };

  return (
    <>
      <Helmet>
        <title>All Campaigns | Crowd Stream</title>
      </Helmet>
      <section className="flex justify-center">
        <div className="w-primary pt-28 pb-10 px-5 overflow-y-hidden">
          <div className="w-full p-7 md:p-10 border bg-pattern dark:border-border-1 flex justify-between items-center rounded-3xl flex-col lg:flex-row">
            <div data-aos="fade-up" className="space-y-2 z-20">
              <h2 className="dark:text-white text-3xl md:text-4xl font-semibold">
                All campaigns
              </h2>
              <p className="text-sm md:text-base">
                View all active and expired campaigns on Crowd Stream Des.
                Discover projects seeking
                <br /> funding and those that have successfully reached their
                goals!
              </p>
            </div>
            <JackInTheBox>
              <img
                width={120}
                src={TargetImage}
                alt="Power"
                className="animate-pulse opacity-40 lg:opacity-100 -mt-20 lg:m-0 z-10"
              />
            </JackInTheBox>
          </div>
        </div>
      </section>
      <section className="flex justify-center pb-10">
        <div className="w-primary flex justify-center px-5">
          <div className="w-full flex items-center justify-between border p-5 rounded-xl gap-5 flex-wrap dark:border-border-1">
            <div className="flex items-center gap-5 w-8/12 flex-grow md:flex-grow-0 lg:w-4/12">
              <input
                className="w-full bg-transparent outline-none px-5 py-2 border dark:border-border-1 rounded-xl focus:ring-2 dark:ring-border-1 ring-border-2 "
                onChange={serachHandel}
                ref={serachRef}
                placeholder="Type Something To Search"
                name="search"
              />
            </div>
            <div className="w-[200px] flex-grow md:flex-grow-0">
              <button
                onClick={() => {
                  setsorted(!sorted);
                  sortHandel();
                }}
                className="w-full dark:bg-slate-800 py-2 rounded-lg border dark:border-border-1 flex items-center gap-3 justify-center"
              >
                Sort by Price
                {sorted ? (
                  <GoSortDesc size={20} />
                ) : (
                  <GoSortDesc size={20} className="rotate-180" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="w-primary px-5 pb-10 flex justify-center items-center overflow-x-scroll">
          <ScrollArea className="!w-full">
            <Table className="dark:!text-text-1 w-primary lg:w-full">
              <TableCaption className="dark:text-text-1 text-text-2 dark:bg-slate-800 px-5 py-2 rounded-3xl border dark:border-border-1">
                A list of your added campaigns.
              </TableCaption>
              <TableHeader>
                <TableRow className="dark:!bg-slate-800 dark:border !w-full dark:border-border-1 transition-none bg-border-2 hover:bg-border-2 !text-text-2">
                  <TableHead className="w-[720px]">Title</TableHead>
                  <TableHead className="w-[150px]">Ammount</TableHead>
                  <TableHead className="w-[300px]">Created At</TableHead>
                  <TableHead className="w-[400px]">Deadline</TableHead>
                  <TableHead className="w-[300px]">Category</TableHead>
                  <TableHead className="text-right w-[150px]">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {campData
                  ? campData.map((camp, index) => {
                      return (
                        <TableRow
                          key={index}
                          className="dark:hover:bg-slate-950 dark:border-border-1 cursor-pointer transition-none"
                        >
                          <TableCell className="font-medium">
                            {camp.title.slice(0)}
                            {verifyDeadline({
                              deadline: moment(camp?.deadline).format(
                                "YYYY-MM-DD"
                              ),
                            }) === 1 ? (
                              <span className="bg-green-500 text-white px-3 py-[2px] rounded-full ml-2">
                                Published
                              </span>
                            ) : (
                              <span className="bg-red-600 text-white px-3 py-[2px] rounded-full ml-2">
                                Expired
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{camp.minAmmount}$</TableCell>
                          <TableCell>
                            {new Date(camp.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {moment(camp?.deadline).format(
                              "dddd, MMMM D, YYYY"
                            )}
                          </TableCell>
                          <TableCell>
                            {camp.category.split("-").join(" ")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Link to={`../campaign/${camp?._id}`}>
                              <button className="hover:underline hover:text-green-500">
                                View Details
                              </button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  : Array.from({ length: 8 }).map((_, index) => (
                      <TableRow
                        key={index}
                        className="dark:hover:bg-slate-950 dark:border-border-1 cursor-pointer"
                      >
                        <TableCell className="font-medium">
                          <Skeleton>
                            Loading Loading Loading Loading Loading Loading
                            Loa..
                          </Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton>lo.</Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton>L</Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton>L</Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton>L</Skeleton>
                        </TableCell>
                        <TableCell>
                          <Skeleton>L</Skeleton>
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" className="!flex" />
          </ScrollArea>
        </div>
      </section>
    </>
  );
};

export default AllCampaigns;
