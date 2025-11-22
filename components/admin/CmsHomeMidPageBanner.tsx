"use client";

import React, { useRef, useState } from "react";
import { UploadCloud, FileText, XCircle } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import CmsHomePageTitle from "./CmsHomePageTitle";

const App = () => {
  const [heroImage, setHeroImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG/JPG).");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setHeroImage(reader.result);
      } else {
        setHeroImage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Remove Image
  const handleRemoveImage = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    setHeroImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast("Image removed successfully.", { icon: "🗑️" });
  };

  // Save Settings
  const handleSaveSettings = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    console.log("Saving Mid-Page Banner settings with image:", heroImage);

    toast.success("Mid-Page Banner settings saved!", {
      position: "bottom-center",
    });
  };

  const inputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] border-2 border-[#e8e3dc] rounded-lg focus:outline-none placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-800 mb-1";

  return (
    <div className="bg-gray-50 mt-6">
      <div className="p-6 bg-white rounded-xl border-2 border-[#e8e3dc]">
        <CmsHomePageTitle
          title="Mid-Page Promotional Banner"
          text="Secondary banner for promotions or campaigns"
        />

        {/* Banner Image Upload */}
        <div className="mb-6">
          <h3 className="text-base font-medium text-gray-800 py-4">
            Banner Image
          </h3>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />

          <div
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex justify-center items-center h-[300px] border-2 rounded-xl transition-colors overflow-hidden ${
              heroImage
                ? "border-transparent cursor-pointer"
                : "bg-[linear-gradient(135deg,#faf9f7,rgba(232,227,220,0.3))] border-[#e8e3dc] hover:border-gray-400 cursor-pointer"
            }`}
          >
            {heroImage ? (
              <>
                <div className="relative w-full h-full">
                  <Image
                    src={heroImage}
                    alt="Uploaded Banner"
                    fill
                    className="object-contain rounded-xl"
                    sizes="100vw"
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-opacity-0 hover:bg-black/20 transition-all duration-300 group">
                  <p className="text-white text-lg font-bold p-3 bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition">
                    Click to change image
                  </p>
                </div>

                <button
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-1 text-white bg-red-600 rounded-full shadow-xl hover:bg-red-700 transition z-10"
                >
                  <XCircle className="w-7 h-7" />
                </button>
              </>
            ) : (
              <div className="text-center p-4">
                <UploadCloud className="w-10 h-10 mx-auto text-gray-500" />
                <p className="text-lg text-gray-700 font-medium mt-3">
                  Upload promotional banner
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  1920x600px recommended
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Inputs Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
          <div>
            <label className={labelClass}>Banner Title</label>
            <input
              type="text"
              defaultValue="Create Your Own Style"
              placeholder="Enter the banner title"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Button Text</label>
            <input
              type="text"
              defaultValue="Start Designing"
              placeholder="Text for the call-to-action button"
              className={inputClass}
            />
          </div>
        </div>

        <div className="mb-8">
          <label className={labelClass}>Banner Subtitle</label>
          <textarea
            rows={3}
            defaultValue="Use our AI-powered design studio or manual text creator to bring your vision to life. Professional 300 DPI quality guaranteed on every product."
            placeholder="Enter the descriptive subtitle"
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveSettings}
          className="w-full flex items-center justify-center py-3 px-4 bg-[linear-gradient(180deg,#8b6f47,#7a5f3a)] text-white font-semibold rounded-lg hover:brightness-110 transition hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#8b6f47]/50"
        >
          <FileText className="w-5 h-5 mr-3" />
          Save Mid-Page Banner
        </button>
      </div>

      <Toaster />
    </div>
  );
};

export default App;
