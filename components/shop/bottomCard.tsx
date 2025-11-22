// pages/index.js
"use client";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

import { Jost, Roboto_Flex } from "next/font/google";
import { useRouter } from "next/navigation";

// --- Imported Assets ---
import mugImage from "@/public/image/shopIcon/mugImage.jpg";
import cupImage from "@/public/image/shopIcon/cup.jpg";
import loveIcon from "@/public/image/shopIcon/loveIcon.svg";
import shopIcon from "@/public/image/shopIcon/shopIcon.svg";
import arrowIcon from "@/public/image/shopIcon/arrowIcon.svg";
import colorStarIcon from "@/public/image/shopIcon/colorStar.svg";

import tshirtsImage from "@/public/image/shopIcon/tshirts.jpg";
import girlTshitImage from "@/public/image/shopIcon/girlTshirt.jpg";
import hoodyImage from "@/public/image/shopIcon/hoody.jpg";
import nextButtonImage from "@/public/image/shopIcon/nextArrow.svg";
// -----------------------

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const roboto = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-roboto",
});

interface IconToggleButtonProps {
  src: StaticImageData;
  alt: string;
}

const IconToggleButton = ({ src, alt }: IconToggleButtonProps) => (
  <motion.button
    className="bg-[#D4AF37] p-2 shadow-md text-gray-700 hover:opacity-80 transition-opacity"
    whileHover={{ scale: 1.1, rotate: 5 }}
    whileTap={{ scale: 0.9, rotate: -5 }}
  >
    <Image src={src} alt={alt} width={20} height={20} className="w-5 h-5" />
  </motion.button>
);

// Card Data Array
const products = [
  {
    name: "Women's Fitted Tee",
    price: "$32.99",
    image: tshirtsImage,
    alt: "Women's Fitted Tee",
    delay: 0.2,
  },
  {
    name: "Kids Fun T-Shirt",
    price: "$19.99",
    image: girlTshitImage,
    alt: "Kids Fun T-Shirt",
    delay: 0.4,
  },
  {
    name: "Oversized Hoodie",
    price: "$49.99",
    image: hoodyImage,
    alt: "Oversized Hoodie",
    delay: 0.6,
  },
  {
    name: "Classic Coffee Mug",
    price: "$14.50",
    image: mugImage,
    alt: "Classic Coffee Mug",
    delay: 0.1,
  },
  {
    name: "Travel Tumbler (Steel)",
    price: "$28.99",
    image: cupImage,
    alt: "Travel Tumbler",
    delay: 0.2,
  },
  {
    name: "Vintage Crewneck Tee",
    price: "$35.00",
    image: tshirtsImage,
    alt: "Vintage Crewneck Tee",
    delay: 0.3,
  },
  {
    name: "Unisex Heavy Hoodie",
    price: "$55.99",
    image: hoodyImage,
    alt: "Unisex Heavy Hoodie",
    delay: 0.4,
  },
  {
    name: "Toddler Graphic Tee",
    price: "$15.99",
    image: girlTshitImage,
    alt: "Toddler Graphic Tee",
    delay: 0.5,
  },
  {
    name: "Large Custom Mug",
    price: "$18.00",
    image: mugImage,
    alt: "Large Custom Mug",
    delay: 0.6,
  },
  {
    name: "Insulated Sports Cup",
    price: "$25.00",
    image: cupImage,
    alt: "Insulated Sports Cup",
    delay: 0.7,
  },
  {
    name: "Premium V-Neck T-shirt",
    price: "$39.99",
    image: tshirtsImage,
    alt: "Premium V-Neck T-shirt",
    delay: 0.8,
  },
  {
    name: "Zip-Up Fleece Hoodie",
    price: "$62.00",
    image: hoodyImage,
    alt: "Zip-Up Fleece Hoodie",
    delay: 0.9,
  },
  {
    name: "Infant Onesie",
    price: "$12.99",
    image: girlTshitImage,
    alt: "Infant Onesie",
    delay: 1.0,
  },
];

const DUMMY_PRODUCT_COUNT = products.length;
const resultsPerPage = 3;
const totalPages = Math.ceil(DUMMY_PRODUCT_COUNT / resultsPerPage);
const MAX_PAGES_TO_SHOW = 6;

export default function Home() {
  const router = useRouter();

  const handleOrderNow = () => {
    // 'ORDER NOW'
    router.push(`/pages/shipping`);
  };

  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = currentPage * resultsPerPage;
  const productsToDisplay = products.slice(startIndex, endIndex);

  const pagesToShow = useMemo(() => {
    const pages = [];
    const actualTotalPages = totalPages;

    const halfLimit = Math.floor(MAX_PAGES_TO_SHOW / 2);
    let startPage = currentPage - halfLimit;
    let endPage =
      currentPage + halfLimit - (MAX_PAGES_TO_SHOW % 2 === 0 ? 1 : 0);

    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(actualTotalPages, MAX_PAGES_TO_SHOW);
    }

    if (endPage > actualTotalPages) {
      endPage = actualTotalPages;
      startPage = Math.max(1, actualTotalPages - MAX_PAGES_TO_SHOW + 1);
    }

    if (actualTotalPages < MAX_PAGES_TO_SHOW) {
      startPage = 1;
      endPage = actualTotalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }, [currentPage]); // ✅ Removed totalPages from dependencies

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const defaultClasses = `${roboto.className} sm:w-10 sm:h-10 flex items-center justify-center rounded-md border-[1.5] sm:text-[18px] transition-colors duration-150 border-[#795548] bg-white text-[#795548] hover:bg-stone-50`;
  const activeClasses = `${roboto.className} sm:w-10 sm:h-10 flex items-center justify-center rounded-md border-[1.5] sm:text-[18px] transition-colors duration-150 border-[#795548] bg-[#795548] text-white`;

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(
    startIndex + productsToDisplay.length,
    DUMMY_PRODUCT_COUNT
  );

  return (
    <div className={`bg-[#FAFAFA] ${jostFont.className}`}>
      <main className="max-w-8xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center md:justify-start gap-x-[30px] gap-y-10">
          {productsToDisplay.map((product, index) => (
            <motion.div
              key={startIndex + index}
              className="group flex flex-col items-center w-full sm:w-[calc(50%-15px)] lg:w-[calc(33.333%-20px)] mb-10 overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-full h-80 overflow-hidden mb-6">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    objectFit="cover"
                    className="brightness-[0.9]"
                  />
                </motion.div>

                <div className="absolute top-4 right-4 flex space-x-2">
                  <IconToggleButton src={loveIcon} alt="Love Icon" />
                  <IconToggleButton src={shopIcon} alt="Shop Icon" />
                </div>

                <motion.button
                  className={`${jostFont.className} absolute bottom-[8%] w-[90%] left-1/2 -translate-x-1/2 h-12 border-2 border-[#ffffff] bg-white/10 text-[#fff] tracking-[2.1px] uppercase text-[14px] font-medium flex items-center justify-center`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                  whileHover={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    borderColor: "#D4AF37",
                    scale: 1.03,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  CUSTOMIZE
                  <Image
                    src={arrowIcon}
                    alt="Arrow Icon"
                    width={16}
                    height={16}
                    className="ml-2"
                  />
                </motion.button>
              </div>

              <div className="w-full max-w-md text-center">
                <h3
                  className={`${jostFont.className} text-[16px] text-[#2c2c2c] mb-1`}
                >
                  {product.name}
                </h3>
                <p
                  className={`${jostFont.className} text-[16px] font-medium mb-2`}
                >
                  {product.price}
                </p>
                <div className="flex justify-center items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Image
                      key={i}
                      src={colorStarIcon}
                      alt="Star Rating"
                      width={14}
                      height={14}
                    />
                  ))}
                </div>
                <motion.button
                  className={`${jostFont.className} shadow text-[14px] w-3/4 h-12 mb-8 bg-[#D4AF37] text-[#000] py-3 tracking-[2.1px] uppercase font-medium`}
                  whileHover={{
                    scale: 1.04,
                    backgroundColor: "#c2a25b",
                    boxShadow: "0px 5px 15px rgba(212, 175, 55, 0.4)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleOrderNow}
                >
                  ORDER NOW
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <footer>
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-6 space-y-4 sm:space-y-0">
          <motion.div
            className={`${roboto.className} text-base font-normal sm:text-[20px] text-[#636363] order-2 sm:order-1 mt-4 sm:mt-0`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Showing {startResult}-{endResult} of {DUMMY_PRODUCT_COUNT} results
          </motion.div>

          <div className="flex space-x-1 sm:space-x-2 order-1 sm:order-2">
            <motion.button
              className="w-16 h-8 text-xs sm:w-20 sm:h-10 sm:text-[18px] flex items-center justify-center rounded-md border-[1.5px] transition-colors duration-150 border-[#795548] bg-white text-[#795548] hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image
                src={nextButtonImage}
                alt="previous icon"
                width={16}
                height={16}
                className="mr-1 rotate-180"
              />
              Prev
            </motion.button>

            <div className="flex space-x-1 sm:space-x-2">
              {pagesToShow.map((page) => (
                <motion.button
                  key={page}
                  className={
                    page === currentPage
                      ? `${activeClasses} w-8 h-8 text-sm`
                      : `${defaultClasses} w-8 h-8 text-sm`
                  }
                  aria-current={page === currentPage ? "page" : undefined}
                  onClick={() => handlePageChange(page)}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#795548",
                    color: "#fff",
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {page}
                </motion.button>
              ))}
            </div>

            <motion.button
              className="w-16 h-8 text-xs sm:w-20 sm:h-10 sm:text-[18px] flex items-center justify-center rounded-md border-[1.5px] transition-colors duration-150 border-[#795548] bg-white text-[#795548] hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next
              <Image
                src={nextButtonImage}
                alt="next icon"
                width={16}
                height={16}
                className="ml-1"
              />
            </motion.button>
          </div>
        </div>
      </footer>
    </div>
  );
}
