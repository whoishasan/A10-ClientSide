import { JackInTheBox } from "react-awesome-reveal";
import UpdateImage from "@/assets/image/update.png";
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AuthContext } from "@/context/AuthContext";
import Tiptap from "@/components/ui/Tiptap";
import Button from "@/components/ui/Button";
import { ImSpinner3 } from "react-icons/im";
import { PiSpinnerThin } from "react-icons/pi";
import { BsUpload } from "react-icons/bs";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import Tick from "@/assets/image/tick.png";
import Notfound from "../Notfound/Notfound";
import moment from "moment";

const UpdateCampaign = () => {
  const { authInfo, isLoading } = useContext(AuthContext);
  const [content, setContent] = useState(``);
  const [isLoadingIcon, setisLoadingIcon] = useState();
  const { id } = useParams();
  const [updateCampaign, setupdateCampaign] = useState();
  const [isUploading, setisUploading] = useState();
  const [campThumb, setcampThumb] = useState();
  const [succesModal, setsuccesModal] = useState(false);
  const thumbInput = useRef();

  const fetchData = () => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/campaign?campId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setupdateCampaign(data);
        setcampThumb({ url: data?.thumb });
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handelUploadImage = async () => {
    const fileDetail = thumbInput.current.files[0];

    if (!thumbInput.current?.files[0]) {
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

    const file = thumbInput.current.files[0];
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
      setcampThumb({ url: upload.secure_url });
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setisUploading(false);
    }
  };

  const handelUpdate = (e) => {
    e.preventDefault();
    setisLoadingIcon(true);
    const formTarget = e.target;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("campId", id);
    urlencoded.append("thumb_URL", campThumb.url);
    urlencoded.append("campTitle", formTarget.campTitle.value);
    urlencoded.append("category", formTarget.campCategory.value);
    urlencoded.append("minAmmount", formTarget.minAmmount.value);
    urlencoded.append(
      "campDeadline",
      moment(formTarget.campDeadline.value, "YYYY-MM-DD").toISOString()
    );
    urlencoded.append("campDes", content);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/updatecampaign`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data._id) {
          setsuccesModal(data._id);
          toast.success("Campaign Update Succesfull");
        } else {
          toast.error("Somethign Wnet Wrong");
        }
      })
      .finally(() => {
        setisLoadingIcon(false);
      });
  };

  if (isLoading) {
    if (!updateCampaign?._id) {
      return <Notfound />;
    }
  }

  return (
    <>
      <Helmet>
        <title>Update Campaign | Crowd Stream</title>
      </Helmet>
      {succesModal && (
        <section className="w-full fixed h-screen items-center flex justify-center z-[9999999999999999] bg-[#1b1b1b43] px-10     py-40">
          <div className="flex space-y-5 flex-col items-center p-10 justify-center w-full lg:w-5/12 2xl:w-[500px] bg-white  dark:bg-slate-800 dark:border-border-1 rounded-2xl">
            <div className="w-full flex justify-end">
              <IoMdClose
                onClick={() => setsuccesModal(false)}
                size={26}
                className="dark:hover:bg-slate-700 hover:bg-slate-200 cursor-pointer rounded-md"
              />
            </div>
            <JackInTheBox>
              <img width={100} src={Tick} alt="Tick" />
            </JackInTheBox>
            <div className="text-center">
              <h2 className="text-2xl dark:text-white font-medium">
                Campaign updated Succes
              </h2>
              <p>Visit you updated campaign</p>
              <Link
                onClick={() => setsuccesModal(false)}
                to={`../campaign/${succesModal}`}
              >
                <button className="mt-5 dark:bg-slate-700 px-5 py-2 border dark:border-border-1 rounded-[70px] hover:rounded-xl transition-all">
                  See Your Campaign
                </button>
              </Link>
            </div>
          </div>
        </section>
      )}
      <section className="flex justify-center">
        <div className="w-primary pt-24 px-5 overflow-y-hidden">
          <div className="w-full p-7 md:p-10 border bg-pattern dark:border-border-1 flex justify-between items-center rounded-3xl flex-col lg:flex-row">
            <div data-aos="fade-up" className="space-y-2 z-20">
              <h2 className="dark:text-white text-3xl md:text-4xl font-semibold">
                Update Campaign
              </h2>
              <p className="text-sm md:text-base">
                If you want to update this campaign you can update anything
              </p>
            </div>
            <JackInTheBox>
              <img
                width={100}
                src={UpdateImage}
                alt="Power"
                className="animate-pulse opacity-40 lg:opacity-100 -mt-20 lg:m-0 z-10"
              />
            </JackInTheBox>
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <form
          onSubmit={handelUpdate}
          className="w-primary flex flex-col-reverse lg:flex-row px-5 py-10 gap-10"
        >
          <div className="w-full lg:w-8/12 p-7 space-y-5 md:p-10 border dark:border-border-1 rounded-3xl">
            <div>
              <h3 className="font-medium pb-1 dark:text-white">
                Campaign Title
              </h3>
              <input
                placeholder="Enter A Title"
                defaultValue={updateCampaign?.title}
                name="campTitle"
                type="text"
                className="w-full bg-transparent px-5 py-2 border dark:border-border-1 rounded-lg focus:ring-2 ring-[#2580ff63]"
              />
            </div>
            <div>
              <h3 className="font-medium pb-1 dark:text-white">
                Campaign Type{" "}
              </h3>
              <Select
                defaultValue={updateCampaign?.category}
                name="campCategory"
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    defaultValue={updateCampaign?.category}
                    className="!capitalize"
                    placeholder={updateCampaign?.category
                      ?.split("-")
                      ?.join(" ")}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="technology-&-gadgets">
                      Technology & Gadgets
                    </SelectItem>
                    <SelectItem value="creative-arts-&-entertainment">
                      Creative Arts & Entertainment
                    </SelectItem>
                    <SelectItem value="sports-&-fitness">
                      Sports & Fitness
                    </SelectItem>
                    <SelectItem value="health-&-medical">
                      Health & Medical
                    </SelectItem>
                    <SelectItem value="education-&-learning">
                      Education & Learning
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-between gap-5 w-full flex-col sm:flex-row">
              <div className="sm:w-6/12 flex-grow">
                <h3 className="font-medium pb-1 dark:text-white">
                  Min Ammount
                </h3>
                <input
                  placeholder="0+"
                  defaultValue={updateCampaign?.minAmmount}
                  name="minAmmount"
                  type="number"
                  className="w-full bg-transparent px-5 py-2 border dark:border-border-1 rounded-lg focus:ring-2 ring-[#2580ff63]"
                />
              </div>
              <div className="sm:w-6/12 flex-grow">
                <h3 className="font-medium pb-1 dark:text-white">Deadline</h3>
                <input
                  name="campDeadline"
                  defaultValue={
                    updateCampaign &&
                    moment(updateCampaign?.deadline).format("YYYY-MM-DD")
                  }
                  type="date"
                  className="w-full cursor-text bg-transparent px-5 py-2 border dark:border-border-1 rounded-lg focus:ring-2 ring-[#2580ff63]"
                />
              </div>
            </div>
            <div className="flex justify-between gap-5 w-full flex-col sm:flex-row">
              <div className="sm:w-6/12 flex-grow">
                <h3 className="font-medium pb-1 dark:text-white">
                  Author Name
                </h3>
                <div className="w-full dark:bg-slate-800 bg-slate-100 cursor-auto bg-transparent px-5 py-2 border dark:border-border-1 rounded-lg">
                  {authInfo?.displayName}
                </div>
              </div>
              <div className="sm:w-6/12 flex-grow">
                <h3 className="font-medium pb-1 dark:text-white">
                  Author Email
                </h3>
                <div className="w-full lowercase dark:bg-slate-800 cursor-auto bg-slate-100 px-5 py-2 border dark:border-border-1 rounded-lg">
                  {authInfo?.email}
                </div>
              </div>
            </div>
            <div>
              {updateCampaign && (
                <Tiptap
                  content={content}
                  defaultContent={updateCampaign?.description}
                  setContent={setContent}
                />
              )}
            </div>
            <div className="w-full flex justify-end">
              <Button className={"self-end !py-3 text-lg"}>
                {isLoading && <ImSpinner3 size={20} className="animate-spin" />}
                Update Campaign
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-4/12">
            <input
              onChange={handelUploadImage}
              ref={thumbInput}
              name="thumb"
              id="thumb"
              className="hidden"
              type="file"
            />
            <label
              htmlFor="thumb"
              className="w-full cursor-pointer p-20 space-y-3 border dark:border-border-1 rounded-xl flex justify-center flex-col items-center"
            >
              <div>
                {isUploading ? (
                  <PiSpinnerThin className="animate-spin" size="70" />
                ) : (
                  <BsUpload size={70} />
                )}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl">
                  {isUploading ? "Uploading Image..." : "Upload Image"}
                </h3>
              </div>
            </label>
            {campThumb && (
              <div
                style={{ backgroundImage: `url('${campThumb?.url}')` }}
                className="w-full bg-cover bg-center p-40 space-y-3 border dark:border-border-1 rounded-xl mt-5"
              ></div>
            )}
          </div>
        </form>
      </section>
    </>
  );
};

export default UpdateCampaign;
