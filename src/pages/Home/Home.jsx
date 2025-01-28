import Hero from "@/components/Sections/Home/Hero";
import Campaigns from "../../components/Sections/Home/Campaigns";
import Subscribe from "@/components/Sections/Home/Subscribe";
import { Helmet } from "react-helmet-async";
import Faqs from "@/components/Sections/Home/Faqs";
import Review from "@/components/Sections/Home/Review";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Raise Hand to Promote Best Products</title>
      </Helmet>
      <Hero />
      <Campaigns />
      <Review />
      <Faqs />
      <Subscribe />
    </>
  );
};

export default Home;
