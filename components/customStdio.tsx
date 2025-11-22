"use client";

import { useRef, useEffect, useState } from "react";
import stdioImage from "../public/image/stdioImage.png";

// Define the keyframe animation directly in CSS for a simple approach
const animationStyles = (
  // The 'jsx global' prop in Next.js's styled-jsx allows defining global CSS,
  // which is fine in a .tsx file.
  <style jsx global>{`
    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Initial state (hidden) - all elements start invisible and slightly down */
    .slide-up-initial {
      opacity: 0;
      transform: translateY(20px);
    }

    /* Animated state (visible) - this class is ADDED when intersecting */
    .slide-up-animate {
      animation: slideUp 0.7s forwards;
    }

    /* Apply staggered delays using utility classes */
    .slide-up-delay-1 {
      animation-delay: 0.2s;
    }
    .slide-up-delay-2 {
      animation-delay: 0.4s;
    }
    .slide-up-delay-3 {
      animation-delay: 0.6s;
    }
    .slide-up-delay-4 {
      animation-delay: 0.8s;
    }
  `}</style>
);

export default function CustomDesignStudio() {
  // 1. Using TypeScript type assertions for useRef
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // 2. useEffect for Intersection Observer setup (FIXED)
  useEffect(() => {
    // 💡 FIX: Capture the current value of the ref inside the effect
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: Stop observing after the first time
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    // Use the captured ref value for observation
    if (currentRef) {
      observer.observe(currentRef);
    }

    // Cleanup function uses the captured ref value
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []); // The empty dependency array is correct

  // Function to generate dynamic class names
  const animationClasses = (delayClass: string): string =>
    `slide-up-initial ${isVisible ? `slide-up-animate ${delayClass}` : ""}`;

  return (
    <section
      ref={sectionRef} // ref is applied to the section
      className="relative bg-cover bg-center bg-no-repeat text-white flex items-center justify-center min-h-[400px]"
      style={{
        backgroundImage: `url(${stdioImage.src})`,
      }}
    >
      {animationStyles}
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative text-center px-6 max-w-3xl">
        <div
          className={`flex items-center justify-center gap-1 ${animationClasses(
            "slide-up-delay-1"
          )}`}
        >
          <hr className="bg-[#f0c12a] text-[#f0c12a] h-[1px] w-[10%] border-0" />
          <p
            className="tracking-[4px] text-sm uppercase text-[#f0c12a] text-center"
            style={{ fontFamily: "'Jost', sans-serif" }}
          >
            AI Custom Design Studio
          </p>
          <hr className="bg-[#f0c12a] text-[#f0c12a] h-[1px] w-[10%] border-0" />
        </div>

        <h1
          className={`font-['Cormorant_Garamond'] italic text-3xl md:text-4xl font-medium mb-4 ${animationClasses(
            "slide-up-delay-2"
          )}`}
        >
          Create Your Own Style
        </h1>
        <p
          className={`text-sm md:text-base text-gray-200 mb-6 leading-relaxed ${animationClasses(
            "slide-up-delay-3"
          )}`}
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          Use our AI-powered design studio or manual text creator to bring your
          vision to life. <br />
          Professional 300 DPI quality guaranteed on every product.
        </p>
        <button
          className={`bg-[#8B5E3C] hover:bg-[#A06C47] transition-colors px-6 py-2 rounded-sm text-sm tracking-wider font-semibold ${animationClasses(
            "slide-up-delay-4"
          )}`}
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          START DESIGNING
        </button>
      </div>
    </section>
  );
}
