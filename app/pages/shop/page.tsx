import React from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Header from "@/components/shop/header";
import MiddleBody from "@/components/shop/middleBody";

const text = () => {
  return (
    <>
      <Navbar />
      <Header title="Shop" />
      <MiddleBody />
      <Footer />
    </>
  );
};

export default text;
