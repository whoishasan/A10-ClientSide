import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="flex justify-center">
        <div className="w-primary px-5 bg-pattern pt-60 flex justify-start flex-col items-start">
          <div
            className="w-full text-center space-y-3 "
            data-aos="fade-up"
            data-aos-anchor-placement="top-center"
          >
            <h2 className="text-4xl md:text-6xl font-semibold bg-gradient-to-br from-green-500 to-sky-900 bg-clip-text text-transparent  dark:!from-white ">
              Raise Hand to Promote
              <br className="hidden md:block" />
              Best Products
            </h2>
            <p>
              Launch your ideas with our crowdfunding platform! Connect with
              supporters and turn your vision
              <br className="hidden md:block" /> into reality. Start your
              campaign today!
            </p>
          </div>
        </div>
      </section>
      <section className="flex justify-center bg-pattern pt-10 pb-32">
        <div className="flex justify-center px-5 z-10 overflow-hidden h-[400px] w-full heroSlider">
          <Swiper
            className="swiperWidth"
            data-aos="fade-up"
            grabCursor={true}
            loop={true}
            spaceBetween={40}
            autoplay={{
              delay: 1000,
              disableOnInteraction: true,
            }}
            modules={[Autoplay]}
            speed={1000}
            slidesPerView={1}
            breakpoints={{
              780: {
                slidesPerView: 2,
              },
            }}
            centeredSlides={true}
          >
            {SliderData &&
              SliderData.map((slide, index) => (
                <SwiperSlide
                  key={index}
                  style={{ backgroundImage: `url('${slide?.image}')` }}
                  className="overflow-y-hidden group bg-center bg-cover flex flex-col bg-no-repeat group border-8 border-y-green-800 border-x-green-500 backdrop-blur"
                >
                  <div className="flex flex-col justify-end w-full h-full p-5 rounded-4xl">
                    <Link
                      to={`${slide?.category}`}
                      className="z-30 backdrop-blur-2xl hidden group-hover:flex flex-col animate__animated animate__fadeIn  p-8 border border-border-1 bg-[#0000003f] rounded-2xl space-y-3"
                    >
                      <h2 className="text-white text-3xl font-semibold">
                        {slide?.title}
                      </h2>
                      <p className=" text-white">{slide?.des}</p>
                    </Link>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default Hero;

const SliderData = [
  {
    image:
      "https://img.freepik.com/free-photo/turbine-green-energy-electricity-technology-concept_53876-31722.jpg?t=st=1738046818~exp=1738050418~hmac=fd5a21295dba2a617c7845ba5b581aa15f2663b86217cf1deef4b81ade5f75bd&w=826",
    title: "Drive Green Energy Progress",
    des: "Be a part of the sustainable energy revolution. Fund innovative ideas that promote cleaner, greener energy for a better tomorrow.",
    category: "greenenergy",
  },
  {
    image:
      "https://img.freepik.com/free-photo/apply-online-application-form-recruitment-concept_53876-148093.jpg?t=st=1738046897~exp=1738050497~hmac=2b252a846712f76df8159171e78232e1de44a279c9a5d0dee6996ba26f07e5e5&w=740",
    title: "Support Entrepreneurs & Local Dreams",
    des: "Empower small businesses to grow and succeed. Help local entrepreneurs achieve their goals with your support.",
    category: "smallbusiness",
  },
  {
    image:
      "https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg?t=st=1738046293~exp=1738049893~hmac=c422c23674c942d8070d72d2ae5520adc109ff9d172d4dcb375f848f4d4156ed&w=740",
    title: "Transform Healthcare Together",
    des: "Contribute to groundbreaking healthcare innovations. Your support can advance technologies that save lives and improve wellbeing.",
    category: "healthtech",
  },
  {
    image:
      "https://img.freepik.com/free-photo/bright-pop-landscape-design_23-2149213430.jpg?t=st=1738046961~exp=1738050561~hmac=69cd209ddfca5f588461eef38f942fbd74d284dfe5e01f12677cdd5a75ac6fa4&w=740",
    title: "Bring Artistic Visions to Life",
    des: "Creators, let your art shine! Crowdfund your passion projects and bring your unique ideas to the world.",
    category: "creativeprojects",
  },
  {
    image:
      "https://img.freepik.com/free-photo/portrait-young-african-american-man-with-vr-glasses_23-2148932811.jpg?t=st=1738046984~exp=1738050584~hmac=eb8cc2c6685a8508ad6a9f1909082bdeb31309d2a103d3bcc4e95dd53412318e&w=826",
    title: "Innovate the Future with Technology",
    des: "Support visionary tech projects that push the boundaries of innovation. Turn groundbreaking ideas into tomorrow’s reality.",
    category: "techinnovations",
  },
];
