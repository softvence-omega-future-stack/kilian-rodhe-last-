"use client";

import React from "react";
import { Cormorant_Garamond } from "next/font/google";
import { motion, type Variants } from "framer-motion";

// Initialize the font
const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
});

// Animation variants
const headerVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20, // Start slightly below
  },
  animate: {
    opacity: 1,
    y: 0, // Move to final position
    transition: {
      duration: 0.8,
      ease: [0.17, 0.55, 0.55, 1], // Smooth custom easing
    },
  },
};

// Props interface
interface HeaderProps {
  title: string;
}

// Header component with typed props
const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <motion.div
      className="h-[42px] w-full flex flex-1 items-center mb-4 mt-4 lg:mb-14 lg:mt-14 justify-center"
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <h1
        className={`${cormorantItalic.className} text-[42px] lg:text-[72px] font-semibold text-[#1a1a1a] tracking-[0.5px]`}
      >
        {title}
      </h1>
    </motion.div>
  );
};

export default Header;
