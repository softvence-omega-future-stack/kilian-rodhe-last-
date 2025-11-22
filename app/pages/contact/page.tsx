import React from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Title from "./Title";
import Middle from "./MiddleBody";
const page = () => {
  return (
    <>
      <Navbar />
      <Title />
      <Middle />
      <Footer />
    </>
  );
};

export default page;
