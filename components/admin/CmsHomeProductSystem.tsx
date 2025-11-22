import React from "react";
// Assuming Lucide icons and react-hot-toast are available in the environment.
import { FileText } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import CmsHomePageTitle from "./CmsHomePageTitle";

const App = () => {
  // NOTE: Image upload logic is removed as the new design does not feature image upload.

  // HANDLER for saving settings - Updated for Featured Products Section
  const handleSaveSettings = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Saving Featured Products Section settings...");
    // In a real application, you would send the data to an API here
    toast.success("Featured Products Section settings saved!", {
      position: "bottom-center",
    });
  };

  // Custom class for consistent input styling
  const inputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] border-2 border-[#e8e3dc] rounded-lg focus:outline-none placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-800 mb-1";

  // Tailwind classes matching the advisory box background color
  const advisoryBoxBg = "bg-gray-50";

  return (
    <div className=" bg-gray-50 mt-6">
      <div>
        {/* Main Form Container - Matching the image's overall look */}
        <div className="p-6 bg-white rounded-xl border-2 border-[#e8e3dc] ">
          {/* Header Section: Featured Products Section */}
          <CmsHomePageTitle
            title="Featured Products Section"
            text="Showcase your best products on the homepage"
          />

          {/* Input fields - Title and Subtitle side-by-side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {/* Section Title */}
            <div>
              <label className={labelClass}>Section Title</label>
              <input
                type="text"
                placeholder="e.g., Featured Products"
                defaultValue="Featured Products"
                className={inputClass}
              />
            </div>

            {/* Section Subtitle */}
            <div>
              <label className={labelClass}>Section Subtitle</label>
              <input
                type="text"
                placeholder="e.g., Select your canvas and unleash your creativity..."
                defaultValue="Select your canvas and unleash your creativity with our AI-powered design studio"
                className={inputClass}
              />
            </div>
          </div>

          {/* Advisory Box (matches the blue checkmark design) */}
          <div
            className={`p-4 rounded-lg border-2 border-[#e8e3dc] ${advisoryBoxBg} mb-8`}
          >
            <div className="flex items-start">
              {/* Blue Checkmark Icon (Simulated with a checkmark and color) */}
              <svg
                className="w-5 h-5 text-blue-600 mr-3 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-sm text-gray-700">
                Featured products are automatically selected from your products
                marked as
                <strong className="font-semibold">
                  &quot;Featured&quot;
                </strong>{" "}
                in the Products Management section.
              </p>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            type="button"
            className="w-full flex items-center justify-center py-3 px-4 
                                    bg-[linear-gradient(180deg,#8b6f47,#7a5f3a)] text-white font-semibold rounded-lg 
                                    hover:brightness-110 transition duration-150 ease-in-out 
                                    shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#8b6f47]/50"
          >
            <FileText className="w-5 h-5 mr-3" />
            Save Featured Section
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
