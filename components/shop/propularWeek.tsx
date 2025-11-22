// pages/index.js
"use client";
import Head from "next/head";
import Image, { StaticImageData } from "next/image"; // Import StaticImageData
import { motion } from "framer-motion";

import { Jost, Cormorant_Garamond } from "next/font/google";

// --- Imported Assets ---
import mugImage from "@/public/image/shopIcon/mugImage.jpg";
import cupImage from "@/public/image/shopIcon/cup.jpg";
import loveIcon from "@/public/image/shopIcon/loveIcon.svg";
import shopIcon from "@/public/image/shopIcon/shopIcon.svg";
import arrowIcon from "@/public/image/shopIcon/arrowIcon.svg";
import colorStarIcon from "@/public/image/shopIcon/colorStar.svg";
// -----------------------

import { useRouter } from "next/navigation";

import BottomCard from "@/components/shop/bottomCard";

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
});

// Define the correct type for the props
interface IconToggleButtonProps {
  src: StaticImageData; // Local imports are of type StaticImageData
  alt: string;
}

const IconToggleButton = ({ src, alt }: IconToggleButtonProps) => (
  <motion.button
    className="bg-[#D4AF37] p-2 shadow-md text-gray-700 hover:opacity-80 transition-opacity"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
  >
    <Image src={src} alt={alt} width={20} height={20} className="w-5 h-5" />
  </motion.button>
);

// Card Data Array
const products = [
  {
    name: "Premium Coffee Mug",
    price: "$14.99",
    image: mugImage,
    alt: "Premium Coffee Mug",
    delay: 0.2,
  },
  {
    name: "Snapback Cap",
    price: "$24.99",
    image: cupImage,
    alt: "Snapback Cap",
    delay: 0.4,
  },
];

export default function Home() {
  const router = useRouter();

  const handleOrderNow = () => {
    // 'ORDER NOW'
    router.push(`/pages/shipping`);
  };
  return (
    <div className={` bg-[#FAFAFA] ${jostFont.className}`}>
      <Head>
        <title>Popular This Week</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className=" max-w-8xl">
        {/* Title Section */}
        <motion.h1
          className={`${cormorantItalic.className} text-[40px] md:text-[58px] mb-4 mt-2 font-medium text-[#1A1A1A]`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Popular this week
        </motion.h1>

        {/* Product Grid (Flexbox layout retained) */}
        <div className="flex flex-wrap justify-center md:justify-between">
          {products.map((product, index) => (
            <motion.div
              key={index}
              className="group flex flex-col items-center w-full sm:w-[calc(50%-20px)]  md:max-w-none md:w-[calc(50%-20px)]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: product.delay }}

              // whileHover={{ scale: 1.01 }}
            >
              {/* Image Container (Main Product Image) */}
              <div className="relative w-full h-80 overflow-hidden mb-6">
                <Image
                  src={product.image} // Next.js Image Component
                  alt={product.alt}
                  layout="fill"
                  objectFit="cover"
                  className="brightness-[0.9] transition-transform duration-500" // group-hover:scale-[1.03]
                />

                {/* Customize Bar (Subtle bottom line) */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 "
                  initial={{ height: 1 }}
                  animate={{ height: "4px" }}
                  transition={{ duration: 0.8, delay: product.delay + 0.5 }}
                />

                {/* Icons Overlay (using imported SVG files with Image tags) */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  <IconToggleButton src={loveIcon} alt="Love Icon" />
                  <IconToggleButton src={shopIcon} alt="Shop Icon" />
                </div>

                <motion.button
                  className={`${jostFont.className} absolute bottom-[8%] w-9/10 right-[5%] h-12 border-2 border-[#ffffff] bg-white/10 text-[#fff] tracking-[2.1px] uppercase text-[14px] font-medium transition-colors duration-300 flex items-center justify-center`}
                >
                  CUSTOMIZE
                  <Image
                    src={arrowIcon}
                    alt="Arrow Icon"
                    width={16}
                    height={16}
                    className="ml-2" // Reduced margin for a snug look
                  />
                </motion.button>
              </div>

              {/* Product Info and Buttons */}
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

                {/* Star Ratings */}
                <div className="flex justify-center items-center space-x-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Image
                      key={i} // Added a key to the mapped elements
                      src={colorStarIcon}
                      alt="Star Icon" // Changed alt text to be more specific
                      width={14}
                      height={14}
                    />
                  ))}
                </div>

                {/* ORDER NOW Button */}
                <motion.button
                  className={`${jostFont.className} shadow text-[14px] w-full h-12 mb-8 bg-[#D4AF37] text-[#000] py-3 tracking-[2.1px] uppercase font-medium hover:bg-[#c2a25b] transition-colors duration-300`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOrderNow}
                >
                  ORDER NOW
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <BottomCard />
    </div>
  );
}
