"use client"; // 👈 Important: Add this for client-side hooks like useRouter

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // 👈 Import useRouter

interface Button1Props {
  text: string;
  image?: string;
}

const Button1 = ({ text, image }: Button1Props) => {
  const router = useRouter(); // 👈 Initialize the router

  // Function to handle the click event and navigate
  const handleClick = () => {
    router.push("/pages/collections"); // 👈 Navigate to /collections route
  };

  return (
    <button
      className="mt-6 border w-full border-white px-5 py-2.5 text-[14px] font-medium tracking-wider flex items-center justify-center gap-2 "
      style={{ fontFamily: "'Jost', sans-serif" }}
      onClick={handleClick} // 👈 Add the click handler
    >
      {text}
      {/* Note: In modern Next.js, you usually don't need the /pages part 
                in the route path for the /collections route. */}
      {image && <Image src={image} alt="icon" width={16} height={16} />}
    </button>
  );
};

export default Button1;
