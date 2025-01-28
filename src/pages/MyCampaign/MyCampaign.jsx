import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AuthContext } from "@/context/AuthContext";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { copyToClipboard } from "@/hooks/CopytoClipboard";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import { JackInTheBox } from "react-awesome-reveal";
import ListImage from "@/assets/image/list.png";
import { verifyDeadline } from "@/hooks/VerifyDeadline";

const MyCampaign = () => {
  const { authInfo } = useContext(AuthContext);
  const [myCampaigns, setmyCampaigns] = useState();
  const [isLoadingData, setisLoadingData] = useState(true);
  const [deletModal, setdeletModal] = useState(false);

  useEffect(() => {
    fethData();
  }, [setmyCampaigns]);

  const fethData = () => {
    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/allcampaigns?ownerUID=${
        authInfo?.uid
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setmyCampaigns(data);
        setisLoadingData(false);
      });
  };

  const handelDelete = (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.deletId.value !== `${deletModal?._id?.slice(0, 10)}`) {
      toast.error("Id Not matched");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("ownerUID", authInfo?.uid);
    urlencoded.append("campId", deletModal?._id);

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/deletecampaign`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.code === 404) {
          toast.error("Delete unsuccesfull");
        } else {
          fethData();
          toast.success("Delete Succesfull");
        }
      })
      .finally(() => {
        setdeletModal(false);
      });
  };
  return (
    <>
      <Helmet>
        <title>My Campaigns | Crowd Stream</title>
      </Helmet>
      {deletModal && (
        <section className="w-full fixed h-screen items-center flex justify-center z-[999] bg-[#1b1b1b5e] px-10 py-40">
          <div className="flex border space-y-5 flex-col items-center p-10 justify-center w-full lg:w-5/12 2xl:w-[500px] bg-white  dark:bg-slate-800 dark:border-border-1 rounded-2xl">
            <div className="w-full flex justify-end z-10">
              <IoMdClose
                onClick={() => setdeletModal(false)}
                size={26}
                className="dark:hover:bg-slate-700 hover:bg-slate-200 cursor-pointer rounded-md"
              />
            </div>
            <div className="w-full space-y-2">
              <h2 className="dark:text-white text-2xl -mt-10 font-medium">
                Want To Delete?
              </h2>
              <p>
                If you want to delet this campaign copy this and type{" "}
                <button
                  onClick={() => copyToClipboard(deletModal?._id?.slice(0, 10))}
                  className="dark:text-white text-red-600 font-bold"
                >
                  {deletModal?._id?.slice(0, 10)}
                </button>
              </p>
              <form className="space-y-3 pt-3" onSubmit={handelDelete}>
                <input
                  name="deletId"
                  placeholder="Type Campaign Id"
                  type="text"
                  className="w-full bg-transparent px-5 py-2 border dark:border-border-1 rounded-lg focus:ring-2 ring-[#2580ff63]"
                />
                <button className="bg-red-600 px-5 py-2 text-white rounded-lg hover:rounded-[70px] transition-all">
                  Delete
                </button>
              </form>
            </div>
          </div>
        </section>
      )}
      <section className="flex justify-center">
        <div className="w-primary pt-28 px-5 overflow-y-hidden">
          <div className="w-full p-7 md:p-10 border bg-pattern dark:border-border-1 flex justify-between items-center rounded-3xl flex-col lg:flex-row">
            <div data-aos="fade-up" className="space-y-2 z-20">
              <h2 className="dark:text-white text-3xl md:text-4xl font-semibold">
                My All Campaigns
              </h2>
              <p className="text-sm md:text-base">
                You Can <strong> Edit, Delete, Preview</strong> Your Created
                Campaigns
              </p>
            </div>
            <JackInTheBox>
              <img
                width={100}
                src={ListImage}
                alt="Power"
                className="animate-pulse opacity-40 lg:opacity-100 -mt-20 lg:m-0 z-10"
              />
            </JackInTheBox>
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <div className="w-primary px-5 pt-10 pb-20 flex justify-center items-center overflow-x-scroll">
          <ScrollArea className="w-full">
            <Table className="dark:!text-text-1 w-primary lg:w-full">
              <TableCaption className="dark:text-text-1 text-text-2 dark:bg-slate-800 px-5 py-2 rounded-3xl border dark:border-border-1">
                A list of your added campaigns.
              </TableCaption>
              <TableHeader>
                <TableRow className="dark:!bg-slate-800 dark:border dark:border-border-1 transition-none bg-border-2 hover:bg-border-2 !text-text-2">
                  <TableHead className="w-[520px]">Title</TableHead>
                  <TableHead className="w-[150px]">Ammount</TableHead>
                  <TableHead className="w-[300px]">Created At</TableHead>
                  <TableHead className="w-[300px]">Category</TableHead>
                  <TableHead className="w-[50px]">Update</TableHead>
                  <TableHead className="w-[50px]">Delete</TableHead>
                  <TableHead className="text-right w-[150px]">
                    Details
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoadingData ? (
                  Array.from({ length: 8 }).map((_, index) => (
                    <TableRow
                      key={index}
                      className="dark:hover:bg-slate-950 dark:border-border-1 cursor-pointer"
                    >
                      <TableCell className="font-medium">
                        <Skeleton>
                          Loading Loading Loading Loading Loading Loading Loa..
                        </Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton>lo.</Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton>Loading. loading, loadi.</Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton className={"w-fit p-1"}>
                          <CiEdit size={20} />
                        </Skeleton>
                      </TableCell>
                      <TableCell>
                        <Skeleton className={"w-fit p-1"}>
                          <CiEdit size={20} />
                        </Skeleton>
                      </TableCell>
                      <TableCell className="flex justify-end">
                        <Skeleton className={"w-fit"}>View Details</Skeleton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : myCampaigns.length > 0 ? (
                  myCampaigns &&
                  myCampaigns.map((camps, index) => (
                    <TableRow
                      key={index}
                      className="dark:hover:bg-slate-950 dark:border-border-1 cursor-pointer transition-none"
                    >
                      <TableCell className="font-medium">
                        {camps?.title?.slice(0, 40)}
                        {camps?.title.length > 39 && "..."}
                        {verifyDeadline({
                          deadline: moment(camps?.deadline).format(
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
                      <TableCell>{camps?.minAmmount}$</TableCell>
                      <TableCell>
                        {moment(camps?.createdAt).format("dddd, MMMM D, YYYY")}
                      </TableCell>
                      <TableCell>
                        {camps?.category.split("-").join(" ")}
                      </TableCell>
                      <TableCell>
                        <Link to={`../updatecampaign/${camps?._id}`}>
                          <button className="p-1 rounded-md flex justify-center bg-neutral-200 dark:bg-slate-800 hover:bg-green-400 hover:text-white">
                            <CiEdit size={20} />
                          </button>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => setdeletModal(camps)}
                          className="p-1 rounded-md flex justify-center bg-neutral-200 dark:bg-slate-800 hover:bg-red-400 hover:text-white"
                        >
                          <CiTrash size={20} />
                        </button>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link to={`../campaign/${camps?._id}`}>
                          <button className="hover:underline hover:text-green-500">
                            Veiw Details
                          </button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell>No Campaign You Added</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" className="!flex" />
          </ScrollArea>
        </div>
      </section>
    </>
  );
};

export default MyCampaign;
