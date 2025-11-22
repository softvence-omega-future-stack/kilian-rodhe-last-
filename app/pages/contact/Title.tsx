// File: components/ContactUsHeader.js

import { Jost, Cormorant_Garamond } from "next/font/google";
import React from "react";

// --- Font Definitions ---

const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost", // Optional: for global use
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
  variable: "--font-cormorant-italic",
});

const cormorantNormal = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  variable: "--font-cormorant-normal",
});

// --- Contact Us Header Component ---

const ContactUsHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white">
      {/* 1. "GET IN TOUCH" Text */}
      <p
        className={`text-sm tracking-widest uppercase text-yellow-700 mb-2 ${cormorantNormal.className}`}
      >
        GET IN TOUCH
      </p>

      {/* 2. Main "Contact Us" Heading */}
      {/* Uses the elegant, italic Cormorant Garamond font */}
      <h1
        className={`text-[#1A1A1A] text-[50px] lg:text-[60px] mb-6 ${cormorantItalic.className}`}
      >
        Contact Us
      </h1>

      {/* 3. Separator Line */}
      <div className="w-16 border-t-2 border-yellow-700 mb-8"></div>

      {/* 4. Tagline/Subtitle */}
      {/* Uses the clean, modern Jost font */}
      <p
        className={`text-xl text-gray-700 font-light max-w-lg text-center px-4 ${jostFont.className}`}
      >
        We&apos;re here to help bring your creative vision to life
      </p>
    </div>
  );
};

export default ContactUsHeader;
