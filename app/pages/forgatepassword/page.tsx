"use client";
import { useState } from "react";
import Link from "next/link"; 
import Image from "next/image"; 
import lockIcon2 from '../../../public/image/signinIcon/lockIcon2.svg';
import backIcon from '../../../public/image/signinIcon/backIcon.svg';
import emailIcon from '../../../public/image/signinIcon/Icon (2).svg';
import emailIcon2 from '../../../public/image/signinIcon/emailIcon2.svg';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert(`Reset link sent to ${email}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center mb-6 cursor-pointer text-gray-700 hover:text-gray-900">
          <Link href="/pages/login" className="flex items-center">
            <Image src={backIcon} alt="Back Icon" width={20} height={20} className="mr-2" />
            <span className="text-sm font-medium"
              style={{
                fontFamily: "'Jost', sans-serif"
              }}
            >Back to Login</span>
          </Link>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div
            className="p-4 rounded-xl mb-4"
            style={{ background: "linear-gradient(to right, #8B6F47, #7A5F3A)" }}
          >
            <Image src={lockIcon2} alt="Lock Icon" width={24} height={24} />
          </div>
          <h2 className="text-lg font-semibold mb-2">Forgot Password?</h2>
          <p className="text-gray-500 text-sm text-center"
            style={{
              fontFamily: "'Jost', sans-serif"
            }}
          >
            No worries! Enter your email and we’ll send you reset instructions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="relative">
            <Image
              src={emailIcon}
              alt="Email Icon"
              width={16}
              height={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-lg py-3 pl-10 pr-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B735C] focus:border-transparent"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            style={{ background: "linear-gradient(to right, #8B6F47, #7A5F3A)",  fontFamily: "'Jost', sans-serif" }}
          >
            <Image src={emailIcon2} alt="Email Icon" width={16} height={16} />
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}
