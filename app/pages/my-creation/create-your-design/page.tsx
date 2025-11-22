import React from "react";
import Navber from "@/components/navbar";
import Footer from "@/components/footer";
import CreateDesignHeader from "@/components/createDesignHeader";
import LivePreview from "@/components/livePreview";

const page = () => {
  return (
    <>
      <Navber />
      <CreateDesignHeader />
      <LivePreview />
      <Footer />
    </>
  );
};

export default page;
