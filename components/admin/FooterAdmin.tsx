// components/Footer.js

import React from "react";

const Footer = () => {
  const textColor = "text-gray-600";

  const footerLinks = [
    "Privacy Policy",
    "Terms of Service",
    "GDPR Compliance",
    "Support",
  ];

  return (
    <footer className="w-full">
      <div className="py-6 px-4 sm:px-8 border-t-[1.173] border-[#E8E3DC] bg-white">
        <div
          className="
            
            flex flex-col sm:flex-row 
            items-center sm:items-baseline 
            justify-between
            text-center sm:text-left
            gap-3
          "
        >
          {/* COPYRIGHT TEXT */}
          <p
            className={`
              ${textColor}
              text-[14px] sm:text-base 
              max-[320px]:text-[12px]   /* very small screens */
              max-[260px]:text-[11px]   /* watch size */
              whitespace-nowrap
            `}
          >
            © 2025 Thundra. All rights reserved.
          </p>

          {/* LINKS SECTION */}
          <nav
            className="
              flex flex-wrap justify-center sm:justify-end
              gap-3 sm:gap-6
              max-[320px]:gap-2
            "
          >
            {footerLinks.map((link) => (
              <a
                key={link}
                href="#"
                className={`
                  ${textColor}
                  text-[14px] sm:text-base
                  max-[320px]:text-[12px]  /* small phones */
                  max-[260px]:text-[11px]  /* smartwatch size */
                  hover:text-gray-800
                  transition
                  whitespace-nowrap
                `}
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
