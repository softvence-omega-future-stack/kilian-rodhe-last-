"use client";
import React from "react";
import Image from "next/image"; // Import Image component for Next.js


import { Inter } from "next/font/google";

// Imported local images
import allCategoriesIcon from "@/public/image/shopIcon/Icon (1).svg"; // Using boxColorIcon for active, or normalBoxIcon
import menIcon from "@/public/image/shopIcon/Icon (3).svg";
import womenIcon from "@/public/image/shopIcon/Icon (4).svg";
import kidsIcon from "@/public/image/shopIcon/Icon (5).svg";
import apparelIcon from "@/public/image/shopIcon/Icon (6).svg";
import tshirtIcon from "@/public/image/shopIcon/Icon (7).svg";
import hoodiBoxIcon from "@/public/image/shopIcon/Icon (8).svg";
import capIcon from "@/public/image/shopIcon/Icon (9).svg";
import mugIcon from "@/public/image/shopIcon/Icon (10).svg";
import bagsIcon from "@/public/image/shopIcon/Icon (11).svg";

const inter = Inter({ subsets: ["latin"] });

// Mapping the categories to the imported local images
const categories = [
  {
    name: "All Categories",
    count: null,
    image: allCategoriesIcon,
    active: true,
  },
  { name: "New Arrival", count: 20, image: tshirtIcon }, // Reusing tshirtIcon
  { name: "Men", count: 95, image: menIcon },
  { name: "Women", count: 150, image: womenIcon },
  { name: "Kids", count: 48, image: kidsIcon },
  { name: "Apparel", count: 250, image: apparelIcon },
  { name: "T-Shirts", count: 120, image: tshirtIcon },
  { name: "Hoodies", count: 85, image: hoodiBoxIcon },
  { name: "Caps", count: 45, image: capIcon },
  { name: "Mugs", count: 65, image: mugIcon },
  { name: "Bags", count: 42, image: bagsIcon },
];

const CategorySidebar = () => {


  return (
    <div
      className={` w-full lg:w-58 md:w-full shadow border border-[#E5E5E5] bg-white p-4`}
    >
      <ul className="space-y-1">
        {categories.map((category, index) => {
          // Changed from 'icon' to 'image' for the category data structure
          const ImageSrc = category.image;
          const isActive = category.active;

          return (
            <li
              key={index}
              className={`
                flex items-center justify-between p-2 cursor-pointer transition-colors 
                ${
                  isActive
                    ? "bg-amber-50 text-amber-900 border-l-4 border-amber-600" // Active state
                    : "text-gray-700 hover:bg-gray-100 border-l-4 border-transparent" // Inactive state
                }
              `}
            >
              <div className="flex items-center">
                {/* Use the Next.js Image component for the imported SVG */}
                {ImageSrc && (
                  <Image
                    src={ImageSrc}
                    alt={category.name}
                    width={20}
                    height={20}
                    className="mr-3"
                  />
                )}
                <span
                  className={`${inter.className} text-[14px] leading-[20px] font-medium`}
                >
                  {category.name}
                </span>
              </div>
              {category.count !== null && (
                <span
                  className={`${inter.className} text-[12px] leading-[16px]`}
                >
                  ({category.count})
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategorySidebar;
