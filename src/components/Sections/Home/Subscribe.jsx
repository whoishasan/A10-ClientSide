import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import MeshLove from "@/assets/image/meshgrad.webp";
import { Fade, JackInTheBox } from "react-awesome-reveal";
import toast from "react-hot-toast";
import confetti from "canvas-confetti";

const Subscribe = () => {
  const handelSubscribe = (e) => {
    e.preventDefault();

    if (!e.target.email.value) {
      toast.error("Enter A Valid Email");
      return null;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("email", `${e.target.email.value}`);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    fetch(`${import.meta.env.VITE_BACKEND_URL}/subscribe`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data?.code === 11000) {
          toast.error("Email Alredy Subscribed");
        } else if (data._id) {
          toast.success(`Email Subscirbed Succefuly`);
          handleClick();
          console.log(data);
        } else {
          toast.error("Something Went Wrong");
        }
      })
      .finally(() => {
        e.target.reset();
      });
  };

  const handleClick = () => {
    const scalar = 2;
    const unicorn = confetti.shapeFromText({ text: "✉️", scalar });

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [unicorn],
      scalar,
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 30,
      });

      confetti({
        ...defaults,
        particleCount: 5,
      });

      confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  return (
    <>
      <section className="flex justify-center border-b dark:border-border-1 bg-pattern">
        <div className="w-primary px-5 py-20 ">
          <div className="w-full backdrop-blur p-10 flex flex-col border dark:border-border-1 rounded-2xl lg:flex-row items-center overflow-hidden">
            <div className="w-full lg:w-6/12 space-y-2 z-20">
              <Fade>
                <h2 className="text-4xl md:text-4xl font-semibold bg-gradient-to-br from-green-500 to-sky-900 bg-clip-text text-transparent  dark:!from-white ">
                  Subscribe To Our Newsletter
                </h2>
              </Fade>
              <p data-aos="fade-up">
                Subscribe to our newsletter now to receive the latest updates,
                blog posts, and news. Don’t miss out—stay connected with Crowd
                Stream!
              </p>
              <form
                onSubmit={handelSubscribe}
                data-aos="fade-up"
                className="flex items-center gap-5 pt-5"
              >
                <div className="flex items-center border dark:border-border-1 border-border-2 rounded-xl flex-col w-full sm:flex-row">
                  <input
                    name="email"
                    placeholder="Enter a email address"
                    className="flex-grow placeholder:text-center sm:placeholder:text-start flex-grow bg-transparent py-3 px-5 rounded-t-xl w-full sm:rounded-l-xl sm:rounded-r-none"
                  />
                  <button className="bg-green-500 sm:w-4/12 text-white py-3 px-5 font-medium hover:bg-green-800 w-full rounded-b-xl sm:rounded-b-none sm:rounded-r-xl">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full lg:w-6/12 space-y-2 flex justify-center lg:justify-end">
              <JackInTheBox>
                <img
                  width={300}
                  src={MeshLove}
                  alt="mesh"
                  className="-mt-44 lg:mt-0 z-10 opacity-40 lg:opacity-100"
                />
              </JackInTheBox>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Subscribe;
