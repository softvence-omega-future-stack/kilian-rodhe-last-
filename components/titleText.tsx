"use client";

import React, { useState, useEffect } from "react";

const TitleText = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="w-full flex flex-col items-center text-center gap-4 mb-8  md:mb-12 lg:mb-16 px-2">
      <h2
        className={`
                    text-[#1a1a1a] font-serif italic font-semibold 
                    text-4xl sm:text-4xl md:text-6xl lg:text-6xl 
                    tracking-wide leading-tight transition-all duration-700 ease-out
                    ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4"
                    }
                `}
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        Collections
      </h2>

      <div className="max-w-2xl">
        <p
          className={`
                        text-base md:text-lg text-[#6b6b6b] 
                        tracking-wider leading-relaxed 
                        font-normal font-sans transition-all duration-700 delay-150 ease-out
                        ${
                          isVisible
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 -translate-y-4"
                        }
                    `}
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Unique designs — personalized with your creativity
        </p>
      </div>
    </div>
  );
};

export default TitleText;
