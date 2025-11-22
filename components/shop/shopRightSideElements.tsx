import React from "react";
import HeaderElement from "@/components/shop/headerElements";
import PropularWeek from "./propularWeek";

const shopRightSideElements = () => {
  return (
    <div className="px-4 lg:px-0 md:px-0">
      <HeaderElement />
      <PropularWeek />
    </div>
  );
};

export default shopRightSideElements;
