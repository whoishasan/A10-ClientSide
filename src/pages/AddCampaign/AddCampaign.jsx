import PowerImage from "@/assets/image/power.webp";
import { JackInTheBox } from "react-awesome-reveal";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/ui/Button";
import Tiptap from "@/components/ui/Tiptap";
import { useContext, useRef, useState } from "react";
import { BsUpload } from "react-icons/bs";
import { PiSpinnerThin } from "react-icons/pi";
import toast from "react-hot-toast";
import { AuthContext } from "@/context/AuthContext";
import Tick from "@/assets/image/tick.png";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";
import { Helmet } from "react-helmet-async";
import { ImSpinner3 } from "react-icons/im";
import moment from "moment";

const AddCampaign = () => {
  const { authInfo } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [campThumb, setcampThumb] = useState(null);
  const [isUploading, setisUploading] = useState(false);
  const [succesModal, setsuccesModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const campThumbRef = useRef();

  const handleConfetie = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const handelAddCampaign = (e) => {
    e.preventDefault();
    setisLoading(true);
    const formData = e.target;

    const campTitle = formData.campTitle.value;
    const campCategory = formData.campCategory.value;
    const minAmmount = formData.minAmmount.value;
    const campDeadline = formData.campDeadline.value;
    const date = new Date();

    if (!campTitle) {
      toast.error("Please provide camp title");
      setisLoading(false);
      return;
    }

    if (!campCategory) {
      toast.error("Please chose a camp category");
      setisLoading(false);
      return;
    }

    if (minAmmount <= 0) {
      toast.error("Enter a minimum ammount");
      setisLoading(false);
      return;
    }

    if (!campDeadline) {
      toast.error("Please enter a deadline");
      setisLoading(false);
      return;
    }

    if (content.length < 8) {
      toast.error("Add your campaign description");
      setisLoading(false);
      return;
    }

    if (!campThumb?.url) {
      toast.error("Please add a thumb image");
      setisLoading(false);
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("thumb_URL", campThumb.url);
    urlencoded.append("campTitle", campTitle);
    urlencoded.append("campCategory", campCategory);
    urlencoded.append("campMinAmmount", minAmmount);
    urlencoded.append(
      "campDeadline",
      moment(campDeadline, "YYYY-MM-DD").toISOString()
    );
    urlencoded.append("campDes", content);
    urlencoded.append("UserName", authInfo?.displayName);
    urlencoded.append("UserEmail", authInfo?.email);
    urlencoded.append("UserAvatar", authInfo?.photoURL);
    urlencoded.append("OwnerUid", authInfo?.uid);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/campaign/add`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setcampThumb(null);
        formData.reset();
        handleConfetie();
        setsuccesModal(data.campId);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  const handelUploadImage = async () => {
    const fileDetail = campThumbRef.current.files[0];

    if (!campThumbRef.current?.files[0]) {
      toast.error("Please select an image first!");
      return;
    }

    if (
      fileDetail.type !== "image/jpeg" &&
      fileDetail.type !== "image/png" &&
      fileDetail.type !== "image/webp" &&
      fileDetail.type !== "image/svg+xml"
    ) {
      toast.error("Only PNG, JPEG, and WEBP formats are supported.");
      return;
    }

    setisUploading(true);

    const file = campThumbRef.current.files[0];
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

  return (
    <>
      <Helmet>
        <title>Add New Campaign | Crowd Stream</title>
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
                Campaign Added Succes
              </h2>
              <p>Visit you added campaign</p>
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
                Crowdfunding Made Easy
              </h2>
              <p className="text-sm md:text-base">
                Discover how to launch a successful crowdfunding campaign!
                Engage your audience,
                <br className="hidden md:block" /> tell your story, and achieve
                your funding goals to turn your vision into reality
              </p>
            </div>
            <JackInTheBox>
              <img
                width={100}
                src={PowerImage}
                alt="Power"
                className="animate-pulse opacity-40 lg:opacity-100 -mt-32 lg:m-0 z-10"
              />
            </JackInTheBox>
          </div>
        </div>
      </section>
      <section className="flex justify-center">
        <form
          onSubmit={handelAddCampaign}
          className="w-primary flex flex-col-reverse lg:flex-row px-5 py-10 gap-10"
        >
          <div className="w-full lg:w-8/12 p-7 space-y-5 md:p-10 border dark:border-border-1 rounded-3xl">
            <div>
              <h3 className="font-medium pb-1 dark:text-white">
                Campaign Title
              </h3>
              <input
                placeholder="Enter A Title"
                name="campTitle"
                type="text"
                className="w-full bg-transparent px-5 py-2 border dark:border-border-1 rounded-lg focus:ring-2 ring-[#2580ff63]"
              />
            </div>
            <div>
              <h3 className="font-medium pb-1 dark:text-white">
                Campaign Type{" "}
              </h3>
              <Select name="campCategory">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select A Category" />
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
                  name="minAmmount"
                  type="number"
                  className="w-full bg-transparent px-5 py-2 border dark:border-border-1 rounded-lg focus:ring-2 ring-[#2580ff63]"
                />
              </div>
              <div className="sm:w-6/12 flex-grow">
                <h3 className="font-medium pb-1 dark:text-white">Deadline</h3>
                <input
                  placeholder="0+"
                  name="campDeadline"
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
            <Tiptap setContent={setContent} content={content} />
            <div className="w-full flex justify-end">
              <Button className={"self-end !py-3 text-lg"}>
                {isLoading && <ImSpinner3 size={20} className="animate-spin" />}
                Publish Campaign
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-4/12">
            <input
              disabled={isUploading}
              ref={campThumbRef}
              onChange={handelUploadImage}
              name="campThumb"
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
                  {campThumb?.name
                    ? `${campThumb?.name?.slice(0, 10)}...`
                    : "Upload Image"}
                </h3>
              </div>
            </label>
            {campThumb?.url && (
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

export default AddCampaign;
