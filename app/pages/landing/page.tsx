import React from "react";
import Navbar from "@/components/navbar";
import CollecttionSections from "@/components/collecttionSections";
import CustomDesignStudio from "@/components/customStdio";
import WhyChooseTundra from "@/components/whyChooseThanda";
import OurStory from "@/components/ourStory";
import StayInspiredSection from "@/components/stayInspiredSection";
import Footer from "@/components/footer";
import FeaturesSection from "@/components/featureSection";
const page = () => {
  return (
    <>
      <Navbar />
      <CollecttionSections />
      <CustomDesignStudio />
      <WhyChooseTundra />
      <OurStory />
      <FeaturesSection />
      <StayInspiredSection />
      <Footer />

      {/* <FutureProduct /> */}
      {/* <CreateAccount /> */}
      {/* <Login /> */}
      {/* <ForgotPassword /> */}
    </>
  );
};

export default page;
