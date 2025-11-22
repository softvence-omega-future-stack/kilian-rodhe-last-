import React, { useState } from "react";
// Lucide icons used for UI elements
import {
  FileText,
  Plus,
  Trash2,
  Zap,
  Shield,
  Clock,
  Award,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import CmsHomePageTitle from "./CmsHomePageTitle"; // Assuming this component exists

// Component for a single feature row
interface Feature {
  id: number;
  title: string;
  description: string;
}

interface FeatureRowProps {
  feature: Feature;
  index: number;
  // Explicitly defined types for onUpdate
  onUpdate: (index: number, field: "title" | "description", value: string) => void;
  onRemove: (index: number) => void;
}

const FeatureRow: React.FC<FeatureRowProps> = ({ feature, index, onUpdate, onRemove }) => {
  // FIX: Replaced 'React.ComponentType<any>[]' with a type that explicitly defines the props 
  // used by the icon components (className and style), resolving the final 'any' error (32:38).
  const iconMap: React.ComponentType<{ className?: string, style?: React.CSSProperties }>[] = [Zap, Award, Shield, Clock];
  
  // Select an icon based on index or default to the first one
  const IconComponent = iconMap[index % iconMap.length];

  const inputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] rounded-lg focus:outline-none border-none";

  // Golden color for the icon border and text
  const goldenColor = "#D4AF37"; // A representative gold/yellow

  return (
    <div className="flex items-center bg-white p-4 border border-[#e8e3dc] rounded-lg mb-4 transition-shadow hover:shadow-md">
      {/* Icon Container (Golden Box) */}
      <div
        className="flex items-center justify-center w-14 h-14 rounded-lg border-2 mr-4 flex-shrink-0"
        style={{ borderColor: goldenColor }}
      >
        <IconComponent className="w-7 h-7" style={{ color: goldenColor }} />
      </div>

      {/* Title Input */}
      <div className="flex-1 mr-4">
        <input
          type="text"
          value={feature.title}
          onChange={(e) => onUpdate(index, "title", e.target.value)}
          className={inputClass}
          placeholder="Feature Title (e.g., AI-POWERED DESIGN)"
          style={{ backgroundColor: "#f3f3f5" }}
        />
      </div>

      {/* Description Input */}
      <div className="flex-1 mr-4">
        <input
          type="text"
          value={feature.description}
          onChange={(e) => onUpdate(index, "description", e.target.value)}
          className={inputClass}
          placeholder="Feature Description (e.g., Adobe Firefly Integration)"
          style={{ backgroundColor: "#f3f3f5" }}
        />
      </div>

      {/* Remove Button (Red trash icon) */}
      <button
        onClick={() => onRemove(index)}
        className="p-2 text-gray-500 hover:text-red-600 transition flex-shrink-0"
        title="Remove Feature"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

// ---

const App = () => {
  // Initial state matching the features in the image
  const [features, setFeatures] = useState([
    {
      id: 1,
      title: "AI-POWERED DESIGN",
      description: "Adobe Firefly Integration",
    },
    { id: 2, title: "300 DPI QUALITY", description: "Professional Printing" },
    { id: 3, title: "GDPR COMPLIANT", description: "Privacy Protected" },
    { id: 4, title: "24/7 SUPPORT", description: "Always Here to Help" },
  ]);

  // HANDLER for updating a specific statistic field
  const handleUpdateFeature = (
    index: number,
    field: "title" | "description", // Resolved 'any' error
    value: string // Resolved 'any' error
  ) => {
    setFeatures((prevFeatures) =>
      prevFeatures.map((feat, i) =>
        i === index ? { ...feat, [field]: value } : feat
      )
    );
  };

  // HANDLER for adding a new feature
  const handleAddFeature = () => {
    const newId = Math.max(...features.map((f) => f.id), 0) + 1;
    setFeatures((prevFeatures) => [
      ...prevFeatures,
      {
        id: newId,
        title: "NEW FEATURE TITLE",
        description: "New feature description",
      },
    ]);
    toast.success("New feature added!", { position: "bottom-center" });
  };

  // HANDLER for removing a feature
  const handleRemoveFeature = (indexToRemove: number) => {
    setFeatures((prevFeatures) =>
      prevFeatures.filter((_, i) => i !== indexToRemove)
    );
    toast("Feature removed.", { icon: "🗑️", position: "bottom-center" });
  };

  // HANDLER for saving settings
  const handleSaveSettings = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Saving Features Icons Section settings...", features);
    // In a real application, you would send the data to an API here
    toast.success("Features saved successfully!", {
      position: "bottom-center",
    });
  };

  // Adjusted CmsHomePageTitle to integrate Add Feature button logic
  const CmsHomePageTitleWithButton = () => (
    <header className="mb-6 flex justify-between items-start">
      <div>
        {/* Note: CmsHomePageTitle must be defined or imported correctly */}
        <CmsHomePageTitle
          title="Technology & Statistics Section"
          text="Showcase your technology and key metrics"
        />
      </div>

      {/* The "Add Feature" button */}
      <button
        onClick={handleAddFeature}
        className="flex items-center px-4 py-2 text-sm text-white font-medium rounded-lg transition duration-150 ease-in-out hover:brightness-110"
        style={{ backgroundColor: "#8b6f47" }}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Feature
      </button>
    </header>
  );

  return (
    <div className=" bg-gray-50 mt-6">
      <div>
        {/* Main Form Container - Matching the image's overall look */}
        <div className="p-6 bg-white rounded-xl border-2 border-[#e8e3dc]">
          {/* Header Section: Features Icons Section (with Add Button) */}
          <CmsHomePageTitleWithButton />

          {/* Dynamic Feature List */}
          <div className="mb-8">
            {features.map((feature, index) => (
              <FeatureRow
                key={feature.id}
                feature={feature}
                index={index}
                onUpdate={handleUpdateFeature}
                onRemove={handleRemoveFeature}
              />
            ))}
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            type="button"
            className="w-full flex items-center justify-center py-3 px-4 
                          bg-[linear-gradient(180deg,#8b6f47,#7a5f3a)] text-white font-semibold rounded-lg 
                          hover:brightness-110 transition duration-150 ease-in-out 
                          hover:shadow-lg focus:outline-none"
          >
            <FileText className="w-5 h-5 mr-3 " />
            Save Features
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;