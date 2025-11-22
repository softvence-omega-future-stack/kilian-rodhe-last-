"use client";
import { useState } from 'react';
import Image from 'next/image';
import userIcon from '../../../public/image/signinIcon/Icon (1).svg';
import emailIcon from '../../../public/image/signinIcon/Icon (2).svg';
import phoneIcon from '../../../public/image/signinIcon/Icon (3).svg';
import lockIcon from '../../../public/image/signinIcon/Icon (4).svg';
import googleIcon from '../../../public/image/signinIcon/Icon (5).svg';
import facebookIcon from '../../../public/image/signinIcon/Icon (6).svg';
import userIcon2 from '../../../public/image/signinIcon/Icon (7).svg';
import eyeIcon from '../../../public/image/signinIcon/Icon (8).svg'; 
import searchIcon from '../../../public/image/signinIcon/Frame.svg';
import {  FaEyeSlash } from 'react-icons/fa';

export default function CreateAccount() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-gray-200">
                <h2 className="font-['Cormorant_Garamond'] text-[#1A1410] text-[36px] leading-[24px] font-semibold text-center mb-7">
                    Create New Account
                </h2>

                <p className="text-center text-gray-500 tracking-[1] text-sm mb-6"
                 style={{ fontFamily: "'Jost', sans-serif" }}
                >
                    Join thousands of customers who trust Thundra for personalized, high-quality products with AI-powered design.
                </p>

                <form className="space-y-4">
                    <div className="flex gap-3">
                        <div className="w-1/2">
                            <label className="block text-sm font-medium mb-2 text-gray-700">First Name *</label>
                            <div className="relative">
                                <Image src={userIcon} alt="User Icon" width={16} height={16} className="absolute left-3 top-3" />
                                <input type="text" placeholder="John" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:outline-none" />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <label className="block text-sm font-medium  mb-2 text-gray-700">Last Name *</label>
                            <div className="relative">
                                <Image src={userIcon} alt="User Icon" width={16} height={16} className="absolute left-3 top-3" />
                                <input type="text" placeholder="Doe" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:outline-none" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium  mb-2 text-gray-700">Email Address *</label>
                        <div className="relative">
                            <Image src={emailIcon} alt="Email Icon" width={16} height={16} className="absolute left-3 top-3" />
                            <input type="email" placeholder="your@email.com" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Phone Number</label>
                        <div className="relative">
                            <Image src={phoneIcon} alt="Phone Icon" width={16} height={16} className="absolute left-3 top-3" />
                            <input type="tel" placeholder="+49 123 456 7890" className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:outline-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Password *</label>
                        <div className="relative">
                            <Image src={lockIcon} alt="Lock Icon" width={16} height={16} className="absolute left-3 top-3" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a password"
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2.5 text-gray-500"
                            >
                                {showPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <Image src={eyeIcon} alt="Eye Icon" width={16} height={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700">Confirm Password *</label>
                        <div className="relative">
                            <Image src={lockIcon} alt="Lock Icon" width={16} height={16} className="absolute left-3 top-3" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm your password"
                                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-400 focus:outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-2.5 text-gray-500"
                            >
                                {showConfirmPassword ? (
                                    <FaEyeSlash />
                                ) : (
                                    <Image src={eyeIcon} alt="Eye Icon" width={16} height={16} />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="checkbox" className="mr-2" />
                            I agree to the <a href="#" className="text-yellow-800 underline ml-1">Terms & Conditions</a> and <a href="#" className="text-yellow-800 underline ml-1">Privacy Policy</a>
                        </label>
                        <label className="flex items-center text-sm text-gray-600">
                            <input type="checkbox" className="mr-2" />
                            I want to receive marketing emails about new products and special offers
                        </label>
                    </div>

                    <div className="flex justify-end mt-4">
                        <div className="relative">
                            <Image src={searchIcon} alt="Search Icon" width={16} height={16} className="absolute left-3 top-3" />
                            <select className="border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-600 pl-10">
                                <option>English</option>
                                <option>Deutsch</option>
                                <option>Español</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-b from-[#8b6f47] to-[#7a5f3a] h-[48px] text-white py-2 rounded-lg mt-4 hover:bg-[#7a5e3e] transition-all">
                        <span className="inline-flex items-center justify-center gap-2">
                            <Image src={userIcon2} alt="User Icon" width={16} height={16} className="mr-2 text-[#ffffff]" />
                            Create Account
                        </span>
                    </button>

                    <div className="text-center flex w-full justify-center items-center gap-1 text-gray-500 text-sm my-3">
                        {/* Left horizontal rule */}
                        <hr className='flex-1 border-t-[1px] border-[#0000001A]' />

                        {/* Text in the middle */}
                        <span className='px-2'>Or sign up with</span>

                        {/* Right horizontal rule */}
                        <hr className='flex-1 border-t-[1px] border-[#0000001A]' />
                    </div>


                    <div className="flex justify-center gap-4">
                        <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 w-1/2 hover:bg-gray-100">
                            <Image src={googleIcon} alt="Google Icon" width={16} height={16} />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-2 w-1/2 hover:bg-gray-100">
                            <Image src={facebookIcon} alt="Facebook Icon" width={16} height={16} />
                            Facebook
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
