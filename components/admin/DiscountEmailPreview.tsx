// components/EmailPreview.jsx
import React from "react";

const EmailPreview = ({
  name = "John",
  discountCode = "SUMMER-A1B2C3D4",
  discountValue = "10%",
}) => {
  return (
    <div className="bg-gray-50  border-2 rounded-lg border-[#e5e7eb] p-4">
      {/* Outer Container (Simulates the main content area) */}
      <div className=" space-y-2">
        {/* Preview Label */}
        <h3 className="text-sm font-medium text-gray-700">Preview:</h3>

        {/* Email Content Box */}
        <div className="bg-white p-6 sm:p-8 border border-gray-200 rounded-lg shadow-sm space-y-4">
          {/* Email Subject */}
          <h1 className="text-xl font-bold text-[#0a0a0a]">
            Your Exclusive Discount Code is Here! 🎉
          </h1>

          <hr className="border-gray-100" />

          {/* Email Body */}
          <div className="text-gray-700 space-y-4 text-base">
            <p>Hi {name},</p>

            <p>
              Thank you for being a valued customer! Here&quot;s your exclusive
              discount code:
            </p>

            {/* Discount Code Display (Highlighted Box) */}
            <div className="p-4 sm:p-6 text-center bg-purple-50 rounded-lg border border-purple-100">
              <span className="text-2xl sm:text-3xl font-consolas tracking-wider text-purple-700">
                {discountCode}
              </span>
            </div>

            <p>
              Use this code at checkout to get **{discountValue} off** your next
              purchase.
            </p>

            <p>Happy shopping!</p>

            {/* Signature Block */}
            <div className="pt-2 text-sm text-gray-600">
              <p>The Tundra Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
