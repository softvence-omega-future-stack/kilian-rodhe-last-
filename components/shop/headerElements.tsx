"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

import bgImage from "@/public/image/shopIcon/bgImage.png";
import { Jost, Cormorant_Garamond } from "next/font/google";

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
});

// 1. Define the animation variants for the container (parent)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Slightly faster stagger
      delayChildren: 0.2,
    },
  },
};

// 2. Define the animation variants for the individual text items (child)
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const AnimatedHero = () => {
  return (
    <div className="relative bg-[#FAFAFA] h-[350px] md:h-[368px] w-full overflow-hidden px-4">
      {/* Background Image using Next.js Image component */}
      <Image
        src={bgImage}
        alt="All Product Background"
        fill
        priority
        className="object-cover object-center"
      />

      {/* Text Content Overlay - Now with Linear Gradient Background */}
      <motion.div
        className={`
          absolute top-0 left-0 h-full w-full 
          flex flex-col items-start justify-center 
          text-black z-10 p-8 pl-8 md:pl-16
          
          // Custom linear gradient background
          : to-transparent to-transparent/30 
          bg-gradient-to-r from-[#E5D6C3] via-[#E5D6C3]/90 to-transparent 
          md:from-0% md:via-10% md:to-transparent
          
          // Responsive positioning adjustments
          //  md:w-4/5, lg:w-1/2, xl:w-2/5
          md:w-4/5 lg:w-1/2 xl:w-2/5
        `}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* "All Product" - Updated font, color, and size for better match */}
        <motion.h1
          className={`${cormorantItalic.className} text-4xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold
           text-[#1a1a1a] text-left tracking-[0.5px] mb-4`}
          variants={itemVariants}
        >
          All Product
        </motion.h1>

        {/* Description Text - Using Jost font for body, updated color for consistency */}
        <motion.p
          className={`${jostFont.className} text-[18px] sm:text-lg md:text-[18px] text-[#00000]
           text-left leading-[29.25px] tracking-[0.5px] pr-4`}
          variants={itemVariants}
        >
          Customize t-shirts, hoodies, mugs, caps, and bags with our AI-powered
          design generator or manual designer. High-resolution graphics for
          quality printing with no pixelation.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default AnimatedHero;
