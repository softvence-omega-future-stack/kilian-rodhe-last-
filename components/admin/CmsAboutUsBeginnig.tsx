"use client";

import React, { useState } from "react";
import { Upload, X } from "lucide-react"; // X icon for removing image
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

// Mock CmsHomePageTitle component
type CmsHomePageTitleProps = {
  title: string;
  text?: string;
};

const CmsHomePageTitle: React.FC<CmsHomePageTitleProps> = ({ title, text }) => (
  <header className="mb-8">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    <p className="text-sm text-gray-500 mt-1">{text}</p>
  </header>
);

const App = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Store temporary URL
  const [title, setTitle] = useState("Where It All Started");
  const [description, setDescription] = useState(
    "Use our AI-powered design studio or manual text creator to bring your vision to life. Professional 300 DPI quality guaranteed on every product."
  );

  const inputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] border-2 border-[#e8e3dc] rounded-lg focus:outline-none placeholder-gray-400";
  const labelClass = "block text-base font-medium text-gray-800 mb-2";

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      toast.success("Image uploaded successfully!", {
        position: "bottom-center",
      });
    } else {
      setUploadedImage(null);
      if (file) {
        toast.error("Please select a valid image file.", {
          position: "bottom-center",
        });
      }
    }
    event.target.value = ""; // Reset input
  };

  return (
    <div className="bg-gray-50 mt-6 font-sans">
      {/* Main Editor Card */}
      <div className="p-6 bg-white rounded-xl border-2 border-[#e8e3dc]">
        {/* Header */}
        <CmsHomePageTitle title="The Beginning Section" text="Banner Image" />

        {/* Hidden File Input */}
        <input
          type="file"
          accept="image/*"
          id="image-upload-input"
          className="hidden"
          onChange={handleImageUpload}
        />

        {/* Image Upload / Display Area */}
        <div className="mb-8">
          {uploadedImage ? (
            <div className="relative w-full h-80 rounded-xl overflow-hidden border-2 border-[#8c7457]">
              <Image
                src={uploadedImage}
                alt="Uploaded Banner"
                fill
                style={{ objectFit: "contain" }}
                className="rounded-xl"
              />
              <button
                onClick={() => {
                  setUploadedImage(null);
                  toast.success("Image removed.", {
                    position: "bottom-center",
                  });
                }}
                className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg transition duration-150"
                title="Remove Image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="image-upload-input"
              className="cursor-pointer flex flex-col items-center justify-center h-80 bg-[#fbfbfb] border border-[#e8e3dc] rounded-xl p-8 text-center"
            >
              <Upload className="w-8 h-8 text-amber-800/70" />
              <p className="mt-3 text-base text-gray-800 font-medium">
                Upload Image
              </p>
              <p className="text-xs text-gray-500 mt-1">1920x600px recommended</p>
            </label>
          )}
        </div>

        {/* Title Input */}
        <div className="mb-6">
          <label className={labelClass}>Title</label>
          <input
            type="text"
            placeholder="e.g., Where It All Started"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label className={labelClass}>Description</label>
          <textarea
            rows={3}
            placeholder="e.g., Use our AI-powered design studio..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} resize-none h-auto`}
          />
        </div>

        {/* Save Button can be added here if needed */}
      </div>

      <Toaster /> {/* Toast notifications */}
    </div>
  );
};

export default App;
