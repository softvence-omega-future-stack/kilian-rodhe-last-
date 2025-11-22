// PaymentPage.js (or .tsx)

"use client"; // Required for Next.js client components
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Jost, Cormorant_Garamond } from "next/font/google";
import {
  CheckCircle,
} from "lucide-react";

// Imported Assets
import mug from "@/public/image/shipping/mug.png";
import leftArrow from "@/public/image/shipping/Icon (9).svg";
import whiteRightIcon from "@/public/image/shipping/Icon.svg";
import track from "@/public/image/shipping/Icon (5).svg";
import base from "@/public/image/shipping/Icon (6).svg";
import rightIcon from "@/public/image/shipping/Icon (7).svg";
import clock from "@/public/image/shipping/Icon (8).svg";

// Fonts
const jostFont = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const cormorantItalic = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["italic"],
});

const ACCENT_COLOR = "#8b6f47";

// Types
interface PaymentOptionProps {
  label: string;
  value: string;
  selected: string;
  setSelected: (value: string) => void;
}

interface StepProps {
  index: number;
  label: string;
  currentStepIndex?: number;
}

// Payment Option Component
const PaymentOption: React.FC<
  PaymentOptionProps & { children?: React.ReactNode }
> = ({ label, value, selected, setSelected, children }) => {
  const isSelected = value === selected;

  return (
    <div
      onClick={() => setSelected(value)}
      className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-transparent ring-2 ring-offset-1 ring-[#a07d48] bg-[#fdfbf9] shadow-sm"
          : "border-gray-200 hover:border-[#a07d48]/50"
      }`}
    >
      <label className="flex items-center text-base font-medium text-gray-800 cursor-pointer">
        <input
          type="radio"
          name="paymentMethod"
          value={value}
          checked={isSelected}
          onChange={() => setSelected(value)}
          className="h-4 w-4 text-[#a07d48] border-gray-400 focus:ring-[#a07d48] checked:bg-[#a07d48] mr-3"
        />
        {label}
      </label>

      {isSelected && children && <div className="mt-4 pl-8">{children}</div>}
    </div>
  );
};

// Step Component
const Step: React.FC<StepProps> = ({ index, label, currentStepIndex = 2 }) => {
  const isCompleted = index < currentStepIndex;
  const isCurrent = index === currentStepIndex;

  let circleClasses =
    "w-10 h-10 flex items-center justify-center rounded-full text-lg flex-shrink-0 transition-all duration-300";

  if (isCompleted || isCurrent) {
    circleClasses +=
      " bg-[#a07d48] text-white font-medium shadow-md shadow-[#a07d48]/30";
  } else {
    circleClasses += " bg-[#f7f5f3] text-[#a07d48] font-medium";
  }

  let labelClasses =
    "text-sm ml-2 transition-colors duration-300 whitespace-nowrap";

  if (isCompleted || isCurrent) {
    labelClasses += " font-semibold text-gray-800";
  } else {
    labelClasses += " text-gray-400";
  }

  const lineIsSolid = index <= currentStepIndex;

  return (
    <div className="flex items-center">
      {index > 0 && (
        <div
          className={`h-0.5 w-12 mx-2 ${
            lineIsSolid ? "bg-[#a07d48]" : "bg-gray-300"
          }`}
        ></div>
      )}

      <div className="flex items-center">
        <div className={circleClasses}>
          {isCompleted ? (
            <Image
              src={whiteRightIcon}
              width={16}
              height={16}
              alt="Completed"
            />
          ) : (
            index + 1
          )}
        </div>
        <span className={labelClasses}>{label}</span>
      </div>
    </div>
  );
};

// Main Component
const PaymentPage: React.FC = () => {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>("card");

  const ACTIVE_STEP_INDEX = 2;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f9f7f5] font-sans flex flex-col items-center py-10">
        {/* Back Link */}
        <div className="w-full md:container px-3 lg:container mb-5 lg:px-0">
          <button
            onClick={() => router.push("/pages/shop")}
            className="font-medium text-[14px] text-[#6B6560] hover:text-gray-900 transition flex items-center"
          >
            <Image
              src={leftArrow}
              alt="Back arrow"
              width={16}
              height={16}
              className="mr-1"
            />
            <span className="ml-3">Back to Shop</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full border-b bg-[#ffffff] pb-3 border-t pt-3 border-[#E8E3DC] flex flex-col sm:flex-row items-center justify-center mb-12 sm:px-0">
          {["Product Details", "Shipping Info", "Payment"].map(
            (label, index) => (
              <Step
                key={index}
                index={index}
                label={label}
                currentStepIndex={ACTIVE_STEP_INDEX}
              />
            )
          )}
        </div>

        {/* Main Container */}
        <div className="w-full max-w-5xl flex flex-col  lg:flex-row gap-10 p-4 md:p-0">
          {/* Left: Payment Method */}
          <div className="flex-1 rounded-xl p-4 bg-white border-2 border-[#E8E3DC]">
            <h2
              className={`${cormorantItalic.className} text-[24px] font-semibold mb-6 text-[#1A1410]`}
            >
              Payment Method
            </h2>

            <div className={`${jostFont.className} space-y-4`}>
              {/* Credit / Debit Card */}
              <PaymentOption
                label="Credit / Debit Card"
                value="card"
                selected={selectedPayment}
                setSelected={setSelectedPayment}
              >
                <div className="space-y-4 pt-2">
                  <input
                    type="text"
                    defaultValue="1234 5678 9012 3456"
                    className="w-full p-3 bg-gray-100 border-none rounded-md text-gray-600 focus:ring-1 focus:ring-gray-300"
                    placeholder="Card Number"
                  />

                  <div className="flex space-x-4">
                    <input
                      type="text"
                      defaultValue="MM/YY"
                      className="w-1/2 p-3 bg-white border border-gray-200 rounded-md text-gray-600 placeholder-gray-400 focus:ring-1 focus:ring-gray-300"
                      placeholder="MM/YY"
                    />
                    <input
                      type="text"
                      defaultValue="123"
                      className="w-1/2 p-3 bg-gray-100 border-none rounded-md text-gray-600 focus:ring-1 focus:ring-gray-300"
                      placeholder="CVV"
                    />
                  </div>
                </div>
              </PaymentOption>

              {/* PayPal */}
              <PaymentOption
                label="PayPal"
                value="paypal"
                selected={selectedPayment}
                setSelected={setSelectedPayment}
              />

              {/* Bank Transfer */}
              <PaymentOption
                label="Bank Transfer"
                value="bank"
                selected={selectedPayment}
                setSelected={setSelectedPayment}
              />
            </div>

            {/* Secure Box */}
            <div className="mt-8 p-4 border border-green-500 rounded-lg bg-green-50/50 flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-green-700">Secure Payment</p>
                <p>Your payment information is encrypted and secure.</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between pt-8 space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-150 font-medium text-sm"
              >
                Back
              </button>
              <button
                type="submit"
                style={{ backgroundColor: ACCENT_COLOR }}
                className="px-8 py-3 text-white rounded-lg shadow-lg hover:bg-[#8a6a3f] transition duration-150 font-medium text-sm"
              >
                Place Order - $35.73
              </button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div
            className={`${jostFont.className} w-full lg:w-[350px] bg-white rounded-xl p-6 border-2 border-[#E8E3DC] self-start`}
          >
            <h3 className="font-semibold text-gray-800 mb-6 text-lg">
              Order Summary
            </h3>

            <div className="flex items-start space-x-4 mb-4">
              <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={mug}
                  alt="Premium Coffee Mug"
                  className="object-cover"
                  fill
                  sizes="64px"
                />
              </div>

              <div className="pt-1">
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-800 text-sm">
                    Premium Coffee Mug
                  </p>

                  <Image
                    src={whiteRightIcon}
                    alt="Arrow"
                    width={16}
                    height={16}
                  />
                </div>

                <p className="text-xs text-gray-500">Size: M • Color: Black</p>
              </div>
            </div>

            <div className="border-t border-gray-200 my-4" />

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal (1 item)</span>
                <span>$24.99</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>$5.99</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (19% VAT)</span>
                <span>$4.75</span>
              </div>
            </div>

            <div className="border-t border-gray-200 my-4" />

            <div className="flex justify-between font-bold text-lg text-gray-800">
              <span>Total</span>
              <span style={{ color: ACCENT_COLOR }}>$35.73</span>
            </div>

            {/* Extra List */}
            <ul
              className={`${jostFont.className} text-xs text-gray-500 mt-5 space-y-2`}
            >
              <li className="flex items-center">
                <Image src={track} width={16} height={16} alt="track" />
                <span className="ml-2">Free shipping over $150</span>
              </li>

              <li className="flex items-center">
                <Image src={base} width={16} height={16} alt="secure" />
                <span className="ml-2">GDPR compliant & secure</span>
              </li>

              <li className="flex items-center">
                <Image src={rightIcon} width={16} height={16} alt="quality" />
                <span className="ml-2">300 DPI quality guaranteed</span>
              </li>

              <li className="flex items-center">
                <Image src={clock} width={16} height={16} alt="delivery" />
                <span className="ml-2">5–7 business days delivery</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaymentPage;
