import React, { useState } from "react";
// Assuming Lucide icons and react-hot-toast are available in the environment.
import { FileText } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import CmsHomePageTitle from "./CmsHomePageTitle";

// Mock implementation of CmsHomePageTitle for self-contained file

const App = () => {
  // NOTE: State for managing the three statistic pairs (value and label)
  const [stats, setStats] = useState([
    { value: "300+", label: "DPI Quality" },
    { value: "24/7", label: "Support" },
    { value: "100k+", label: "Happy Customers" },
  ]);

  // HANDLER for saving settings - Updated for Technology Section
  const handleSaveSettings = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Saving Technology & Statistics Section settings...", stats);
    // In a real application, you would send the data to an API here
    toast.success("Technology Section settings saved!", {
      position: "bottom-center",
    });
  };

  // HANDLER for updating a specific statistic field
  const handleStatChange = (index: number, field: string, value: string) => {
    setStats((prevStats) =>
      prevStats.map((stat, i) =>
        i === index ? { ...stat, [field]: value } : stat
      )
    );
  };

  // Custom class for consistent input styling
  const inputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] border-2 border-[#e8e3dc] rounded-lg focus:outline-none placeholder-gray-400";
  const labelClass = "block text-sm font-medium text-gray-800 mb-1";

  // Styling for the statistic card inputs
  const statInputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] rounded-lg focus:outline-none border-none";

  return (
    <div className=" bg-gray-50 mt-6">
      <div>
        {/* Main Form Container - Matching the image's overall look */}
        <div className="p-6 bg-white rounded-xl border-2 border-[#e8e3dc] ">
          {/* Header Section: Technology & Statistics Section */}
          <CmsHomePageTitle
            title="Technology & Statistics Section"
            text="Showcase your technology and key metrics"
          />

          {/* Section Title Input */}
          <div className="mb-6">
            <label className={labelClass}>Section Title</label>
            <input
              type="text"
              placeholder="e.g., Where Creativity Meets Technology"
              defaultValue="Where Creativity Meets Technology"
              className={inputClass}
            />
          </div>

          {/* Section Description Input */}
          <div className="mb-8">
            <label className={labelClass}>Section Description</label>
            <textarea
              rows={3}
              placeholder="Describe your value proposition"
              defaultValue="Combine cutting-edge AI with traditional craftsmanship to create unique products that reflect your personal style"
              className={`${inputClass} resize-none h-auto`}
            />
          </div>

          {/* Statistics Section Title */}
          <h3 className="text-base font-medium text-gray-800 mb-4">
            Statistics
          </h3>

          {/* Statistics Blocks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-2 border-2 border-[#e8e3dc] rounded-lg bg-white"
                // The input fields inside the stat block are wrapped in a container that serves as the card
              >
                {/* Statistic Value (Top Input) */}
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) =>
                    handleStatChange(index, "value", e.target.value)
                  }
                  className={statInputClass}
                  style={{
                    // Specific styling to match the image's inner boxes
                    backgroundColor: "#f3f3f5",
                    marginBottom: "0.5rem",
                  }}
                />

                {/* Statistic Label (Bottom Input) */}
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) =>
                    handleStatChange(index, "label", e.target.value)
                  }
                  className={statInputClass}
                  style={{
                    // Specific styling to match the image's inner boxes
                    backgroundColor: "#f3f3f5",
                  }}
                />
              </div>
            ))}
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
            <FileText className="w-5 h-5 mr-3 " />
            Save Technology Section
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
