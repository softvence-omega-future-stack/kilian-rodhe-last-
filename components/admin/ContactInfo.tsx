// components/ContactInfoForm.js

import { Mail, Phone, MessageSquare, MapPin, Clock, Save } from "lucide-react";

import toast, { Toaster } from "react-hot-toast";

const ContactInfoForm = () => {
  const handleSaveSocialLinks = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Contact Information Saved Successfully!", {
      position: "bottom-center",
      duration: 3000,
    });
  };
  return (
    // Outer container with light shadow and rounded corners
    <div className=" bg-white p-6 md:p-8 rounded-xl border-2 border-[#e8e3dc] ">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-6  pb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Contact Information
          </h2>
          <p className="text-sm text-gray-500">
            Main contact details displayed on your website
          </p>
        </div>
        {/* Email Icon in light blue box */}
        <div className="p-3 bg-blue-50 text-blue-500 rounded-lg">
          <Mail className="h-6 w-6" />
        </div>
      </div>

      {/* Form Fields Section */}
      <div className="space-y-6">
        {/* 1. Email Address */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="email"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <Mail className="w-4 h-4 mr-2 text-gray-500" />
            Email Address
          </label>
          <input
            id="email"
            type="email"
            defaultValue="support@thundra.com"
            className="w-full p-3 bg-gray-100 border-2 border-[#e8e3dc] rounded-xl focus:outline-none transition duration-150"
          />
        </div>

        {/* 2. Phone Number */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="phone"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <Phone className="w-4 h-4 mr-2 text-gray-500" />
            Phone Number
          </label>
          <input
            id="phone"
            type="text"
            defaultValue="+49 30 12345678"
            className="w-full p-3 bg-gray-100 border-2 border-[#e8e3dc] rounded-xl  focus:outline-none transition duration-150"
          />
        </div>

        {/* 3. WhatsApp Number */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="whatsapp"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <MessageSquare className="w-4 h-4 mr-2 text-gray-500" />
            WhatsApp Number
          </label>
          <input
            id="whatsapp"
            type="text"
            defaultValue="+49 151 23456789"
            className="w-full p-3 bg-gray-100 rounded-xl border-2 border-[#e8e3dc]   focus:outline-none transition duration-150"
          />
        </div>

        {/* 4. Business Address */}
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="address"
            className="flex items-center text-sm font-medium text-gray-700"
          >
            <MapPin className="w-4 h-4 mr-2 text-gray-500" />
            Business Address
          </label>
          <input
            id="address"
            type="text"
            defaultValue="Friedrichstraße 123, 10117 Berlin, Germany"
            className="w-full p-3 bg-gray-100 border-2 border-[#e8e3dc] rounded-xl focus:outline-none transition duration-150"
          />
        </div>

        {/* 5. Business Hours */}
        <div className="pt-2">
          <div className="flex items-center text-sm font-medium text-gray-700 mb-2">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            Business Hours
          </div>
          <div className="text-sm text-gray-700 bg-gray-100 rounded-xl p-4 border-2 border-[#e8e3dc]  space-y-1">
            <p>
              <strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM
            </p>
            <p>
              <strong>Saturday:</strong> 10:00 AM - 4:00 PM
            </p>
            <p>
              <strong>Sunday:</strong> Closed
            </p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8">
        <button
          onClick={handleSaveSocialLinks}
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-amber-800 hover:bg-amber-900 focus:outline-none transition duration-150"
          style={{
            // Custom background gradient matching the original button's colors
            background: "linear-gradient(180deg, #8b6f47, #7a5f3a)",
            // Custom border matching the original button's colors
            border: "1.2px solid rgba(0, 0, 0, 0)",
          }}
        >
          <Save className="h-5 w-5 mr-2" />
          Save Contact Information
        </button>
        <Toaster position="bottom-center" />
      </div>
    </div>
  );
};

export default ContactInfoForm;
