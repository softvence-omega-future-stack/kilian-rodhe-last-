import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import MiddleBody from "@/components/shipping/middleBody";

const page = () => {
  return (
    <>
      <Navbar />
      <MiddleBody />
      <Footer />
    </>
  );
};

export default page;
