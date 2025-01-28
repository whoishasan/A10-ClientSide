import { FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoURI from "@/assets/image/logo.svg";

const Footer = () => {
  return (
    <>
      <footer className="flex justify-center  dark:text-white py-20 border-t dark:border-border-1">
        <div className="w-primary px-5 flex flex-wrap lg:flex-nowrap gap-10 justify-between lg:gap-20">
          <div className="space-y-5 col-span-12 lg:col-span-4 lg:w-4/12">
            <Link
              to={"/"}
              className="flex w-full items-center gap-3 text-2xl font-medium dark:text-white text-black"
            >
              <img width={40} src={LogoURI} alt="Logo" />
              <span className="hidden sm:block text-2xl w-full font-semibold">
                Crowd Stream
              </span>
            </Link>
            <p>
              Crowd Stream Des is a crowdfunding platform that connects creators
              with supporters to bring innovative projects to life. Join us to
              discover and fund new ideas!
            </p>
            <div className="flex flex-wrap gap-3">
              <SocialIcon link={"https://github.com/Stackmastery"}>
                <FaGithub />
              </SocialIcon>
              <SocialIcon link={"https://www.facebook.com/stackmastery"}>
                <FaFacebook />
              </SocialIcon>
              <SocialIcon
                link={"https://www.youtube.com/@ProgrammingHeroCommunity"}
              >
                <FaYoutube />
              </SocialIcon>
            </div>
          </div>
          <div className="flex flex-col spae-y-5 lg:w-3/12">
            <h2 className="text-xl font-semibold">Resources</h2>
            <ul className="space-y-3 !-ml-10 !list-none pt-5">
              <li>
                <Link to={"/campaigns"} className="hover:underline">
                  All Campaigns
                </Link>
              </li>
              <li>
                <Link to={"/mycampaign"} className="hover:underline">
                  My Campaign
                </Link>
              </li>
              <li>
                <Link to={"/mydonations"} className="hover:underline">
                  Donations
                </Link>
              </li>
              <li>
                <Link to={"/addcampaign"} className="hover:underline">
                  Add Campaign
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col spae-y-5 w-full md:w-1/12 lg:w-3/12">
            <h2 className="text-xl font-semibold">Auth</h2>
            <ul className="space-y-3 !-ml-10 !list-none pt-5">
              <li>
                <Link to={"../auth/login"} className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to={"../auth/register"} className="hover:underline">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col spae-y-5 lg:w-4/12 ">
            <h2 className="text-xl font-semibold">Get in Touch with Us</h2>
            <ul className="space-y-3 !-ml-10 !list-none pt-5 !lowercase">
              <li>832 Thompson Drive, San Fransisco CA 94107, United States</li>
              <li>394-091-3312</li>
              <li>support@gmail.com</li>
            </ul>
          </div>
        </div>
      </footer>
      <section className="border-t dark:border-border-1 py-5 text-center">
        Copyright &copy; {new Date().getFullYear()} All Right Reserve By Crowed
        Stream
      </section>
    </>
  );
};

export default Footer;

const SocialIcon = ({ link, children }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="p-2 text-xl border dark:border-border-1 dark:bg-slate-800 dark:hover:bg-slate-600 hover:bg-neutral-200 transition-all rounded-full"
  >
    {children}
  </a>
);
