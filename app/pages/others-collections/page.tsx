import React from 'react'
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import TopHeader from "./TopHeader";
import MiddleBody from "./MiddleBody";

import CustomDesignStudio from "../../../components/customSignStdio";
const page = () => {
  return (
    <>
      <Navbar />
      <TopHeader />
      <MiddleBody />
      <CustomDesignStudio />
      <Footer />
    </>
  )
}

export default page