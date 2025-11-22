"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image"; // Import the Image component

// Note: Ensure these paths are correct relative to your file structure
import emailIcon from "../../../public/image/signinIcon/Icon (2).svg";
import lockIcon from "../../../public/image/signinIcon/Icon (4).svg";
import eyeIcon from "../../../public/image/signinIcon/Icon (8).svg";
import signinIcon from "../../../public/image/signinIcon/signinIcon.svg";

import { FaEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Initialize the router
  const ACCENT_COLOR = "#8B6F47"; // Defined accent color for styling

  // Function to handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission behavior (page reload)
    // --- Authentication Logic goes here ---
    console.log("Attempting sign-in...");

    // Navigate to the root route (/) after successful sign-in
    // In a real app, this push would happen only after API success.
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f7f5] p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 my-5 w-full max-w-md border border-[#E8E3DC]">
        {/* Heading */}
        <h2 className="text-2xl font-['Cormorant_Garamond'] text-[#1A1410] text-[36px] font-semibold text-center mt-6 mb-8">
          Sign in to your account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Image
                src={emailIcon}
                alt="Email Icon"
                className="absolute left-3 top-1/2 -translate-y-1/2"
                width={16}
                height={16}
              />
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:outline-none transition duration-150"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm mb-2 font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Image
                src={lockIcon}
                alt="Lock Icon"
                className="absolute left-3 top-1/2 -translate-y-1/2"
                width={16}
                height={16}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:outline-none transition duration-150"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? (
                  <FaEyeSlash size={16} /> // Using FaEyeSlash for the 'hide' state
                ) : (
                  <Image src={eyeIcon} alt="Eye Icon" width={16} height={16} />
                )}
              </button>
            </div>
          </div>

          {/* Remember me + Forgot password */}
          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center text-gray-600 font-['Jost']">
              <input
                type="checkbox"
                className={`mr-2 h-4 w-4 rounded border-gray-300 transition duration-150`}
                style={{ accentColor: ACCENT_COLOR }}
              />
              Remember me
            </label>
            <Link
              href="/pages/forgatepassword"
              className={`text-sm font-medium hover:text-[#7a5e3e] transition`}
              style={{ color: ACCENT_COLOR }}
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full text-white py-3 rounded-xl mt-8 mb-4 font-semibold hover:bg-[#7a5e3e] transition-all duration-300 shadow-md shadow-[#8B6F47]/20"
            style={{
              background: `linear-gradient(to right, ${ACCENT_COLOR}, #7A5F3A)`,
              fontFamily: "'Jost', sans-serif",
            }}
          >
            <span className="inline-flex items-center justify-center gap-2">
              <Image src={signinIcon} alt="User Icon" width={16} height={16} />
              Sign In
            </span>
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center text-sm mt-4 text-gray-600 font-['Jost']">
          Don&apos;t have an account?{" "}
          <Link
            href="/pages/signup"
            className="font-semibold hover:text-[#7a5e3e] transition"
            style={{ color: ACCENT_COLOR }}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
