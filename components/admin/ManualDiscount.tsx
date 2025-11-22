import React, { useState } from "react";
import { Info } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
// Import statements...
import warning from "@/public/image/admin/Discount/warningIcon.svg";
import tag from "@/public/image/admin/Discount/tagIcon.svg";
import calander from "@/public/image/admin/Discount/calanderIcon.svg";
import discount from "@/public/image/admin/Discount/discountIcon.svg";
import dropdownArrow from "@/public/image/admin/Discount/droupdown.svg";
import rightRounded from "@/public/image/admin/Discount/rightRounded.svg";
import DiscountTitle from "@/components/admin/DiscountTitle";
import Image from "next/image";

// --- Event Handler ---
const handleSaveSocialLinks = () => {
  // If using this inside a form, call event.preventDefault() in the form submit handler
  toast.success("Generate 100 code Successfully!", {
    position: "bottom-center",
    duration: 3000,
  });
};

// ... SeriesInformation, DiscountSettings, UsageAndExpiry remain the same ...
const SeriesInformation: React.FC = () => (
  <div className="mb-8 ">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <Image src={tag} alt="icon" height={20} width={20} className="mr-2" />
      Series Information
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Series Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Series Name
        </label>
        <input
          type="text"
          placeholder="e.g., SUMMER2025"
          className="mt-1 block w-full rounded-md focus:outline-none border border-gray-300 bg-[#f3f3f5] p-2.5 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">Internal name for tracking</p>
      </div>

      {/* Code Prefix */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Code Prefix (Optional)
        </label>
        <input
          type="text"
          placeholder="e.g., SUMMER-"
          className="mt-1 block w-full rounded-md focus:outline-none border border-gray-300 bg-[#f3f3f5] p-2.5 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          Prefix for all codes in this series
        </p>
      </div>

      {/* Number of Codes */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Number of Codes
        </label>
        <input
          type="number"
          defaultValue="100"
          className="mt-1 block w-full rounded-md focus:outline-none border border-gray-300 bg-[#f3f3f5] p-2.5 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          How many unique codes to generate
        </p>
      </div>

      {/* Code Length - With Dropdown Icon */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Code Length
        </label>
        <div className="relative mt-1">
          <select
            defaultValue="8 characters"
            className="block w-full rounded-md focus:outline-none border border-gray-300 bg-[#f3f3f5] p-2.5 pr-10 text-sm appearance-none" // pr-10 for padding to make space for icon
          >
            <option>8 characters</option>
            <option>10 characters</option>
            <option>12 characters</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Image
              src={dropdownArrow}
              alt="dropdown arrow"
              height={16}
              width={16}
              className="text-gray-400"
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Length of random code</p>
      </div>
    </div>
  </div>
);

const DiscountSettings: React.FC = () => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
      <Image
        src={discount}
        alt="icon"
        height={20}
        width={20}
        className="mr-2"
      />
      Discount Settings
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Discount Type - With Dropdown Icon */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Discount Type
        </label>
        <div className="relative mt-1">
          <select
            defaultValue="Percentage Off"
            className="block w-full rounded-md border border-gray-300 focus:outline-none p-2.5 pr-10 text-sm appearance-none bg-[#f3f3f5]"
          >
            <option>Percentage Off</option>
            <option>Fixed Amount Off</option>
            <option>Free Shipping</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <Image
              src={dropdownArrow}
              alt="dropdown arrow"
              height={16}
              width={16}
              className="text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Percentage */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Percentage (%)
        </label>
        <input
          type="number"
          defaultValue="10"
          className="mt-1 block w-full rounded-md border focus:outline-none border-gray-300 bg-[#f3f3f5] p-2.5 text-sm"
        />
      </div>

      {/* Minimum Purchase */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Minimum Purchase (€)
        </label>
        <input
          type="text"
          defaultValue="0.00"
          className="mt-1 block w-full rounded-md border focus:outline-none border-gray-300 bg-[#f3f3f5] p-2.5 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          Optional minimum order value
        </p>
      </div>

      {/* Maximum Discount */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Maximum Discount (€)
        </label>
        <input
          type="text"
          placeholder="No limit"
          className="mt-1 block w-full rounded-md border focus:outline-none border-gray-300 bg-[#f3f3f5] p-2.5 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">Cap the discount amount</p>
      </div>
    </div>
  </div>
);

const UsageAndExpiry: React.FC = () => {
  const [isOneTimeUse, setIsOneTimeUse] = useState(true);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Image
          src={calander}
          alt="icon"
          height={20}
          width={20}
          className="mr-2"
        />
        Usage & Expiry
      </h3>

      {/* One-Time Use Toggle Card */}
      <div className="p-4 rounded-xl bg-purple-50 border-2 border-purple-200 mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center text-sm font-medium text-gray-900">
            <Image
              src={warning}
              alt="icon"
              height={20}
              width={20}
              className="mr-2"
            />
            One-Time Use (Globally Unique)
          </div>
          <p className="text-xs text-gray-600 mt-1">
            Each code can only be redeemed once by any account. After
            redemption, the code becomes permanently invalid for all users.
          </p>
        </div>
        {/* Toggle Switch */}
        <button
          onClick={() => setIsOneTimeUse(!isOneTimeUse)}
          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 ${
            isOneTimeUse ? "bg-indigo-600" : "bg-gray-200"
          }`}
        >
          <span
            aria-hidden="true"
            className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white transform ring-0 transition ease-in-out duration-200 ${
              isOneTimeUse ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Expiry Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md focus:outline-none border bg-[#f3f3f5] border-gray-300 p-2.5 text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">
            Codes expire at 23:59 on this date
          </p>
        </div>

        {/* Applicable Products - With Dropdown Icon */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Applicable Products
          </label>
          <div className="relative mt-1">
            <select
              defaultValue="All Products"
              className="block w-full rounded-md focus:outline-none border border-gray-300 bg-[#f3f3f5] p-2.5 pr-10 text-sm appearance-none"
            >
              <option>All Products</option>
              <option>Specific Collections</option>
              <option>Specific Products</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <Image
                src={dropdownArrow}
                alt="dropdown arrow"
                height={16}
                width={16}
                className="text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Internal Notes */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Internal Notes
        </label>
        <textarea
          rows={2}
          placeholder="Add any notes about this code series (internal use only)"
          className="mt-1 block resize-none w-full focus:outline-none rounded-md border border-gray-300 bg-[#f3f3f5] p-2.5 text-sm"
        />
      </div>
    </div>
  );
};

// -----------------------------------------------------------------
// 7. ManualDiscountForm (Main Component to Export)
// -----------------------------------------------------------------
const ManualDiscountForm: React.FC = () => {
  return (
    <>
      <DiscountTitle
        text="Create Discount Codes (Manual)"
        paragraph="Generate a new series of unique discount codes"
      />
      <div className="p-8 bg-white border border-gray-200 rounded-xl space-y-8">
        {/* Form Sections */}
        <SeriesInformation />
        <hr className="border-gray-100" />
        <DiscountSettings />
        <hr className="border-gray-100" />
        <UsageAndExpiry />
        <hr className="border-gray-100" />
        {/* Preview Section */}
        <div className="pt-2 w-full bg-[#f9fafb] rounded-lg p-4">
          <p className="text-sm font-medium text-[#4a5565] mb-2">
            Preview Example:
          </p>
          <div className="text-lg font-mono font-bold text-gray-900 bg-gray-50 py-3 rounded w-full ">
            PREFIX-XXXXXXXX
          </div>
          <p className="text-xs text-[#4a5565] mt-2">
            Will generate 100 unique codes
          </p>
        </div>
        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            onClick={handleSaveSocialLinks} // <-- CORRECTED: Changed onSubmit to onClick
            className="w-full flex items-center justify-center px-6 py-3 rounded-xl text-white font-semibold transition-all bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <Image
              src={rightRounded}
              alt="icon"
              height={20}
              width={20}
              className="mr-2"
            />
            Generate 100 Codes
          </button>
          <div className="p-6 rounded-xl border border-blue-200 mt-4 bg-blue-50">
            <div className="flex items-start mb-4">
              {/* Info Icon */}
              <Info className="w-5 h-5 text-[#193CB8] mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-base font-semibold text-blue-800">
                Important:
              </p>
            </div>
            <ul className="list-none space-y-2 pl-8">
              <li className="text-sm text-[#193CB8]">
                Generated codes are globally unique across your entire system
              </li>
              <li className="text-sm text-[#193CB8]">
                One-time codes become invalid immediately after redemption
              </li>
              <li className="text-sm text-[#193CB8]">
                You can download the code list as CSV after generation
              </li>
              <li className="text-sm text-[#193CB8]">
                Codes can be sent to customers via the Email Sending panel
              </li>
            </ul>
          </div>
          <Toaster position="bottom-center" />
        </div>
      </div>
    </>
  );
};

export default ManualDiscountForm;
