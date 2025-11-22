import React from "react";
import CategorySidebar from "./categorySideBar";
import ShopRightSideElements from "./shopRightSideElements";

const MiddleBody = () => {
  return (
    <div className="flex flex-col md:px-20 xl:flex-row min-h-screen w-full">
      {/* Left Sidebar Container (CategorySidebar) */}

      <div className="w-full xl:w-2/10 p-4 xl:p-0">
        <CategorySidebar />
      </div>

      {/* Right Content Panel */}

      <div
        className="w-full xl:w-8/10 bg-white 
                      border-gray-300 
                     xl:border-t-0"
      >
        <ShopRightSideElements />
      </div>
    </div>
  );
};

export default MiddleBody;
