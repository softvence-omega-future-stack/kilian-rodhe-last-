import React, { useState } from "react";
// Lucide icons used for UI elements (Lucide ikon byabohar kora hoyechhe)
import  { Toaster } from "react-hot-toast";

import CmsAboutUsBeginning from "@/components/admin/CmsAboutUsBeginnig";
import CmsAboutUsFeatureCallout from "@/components/admin/CmsAboutUsFeatureCallout";
import CmsAboutUsOurJourny from "@/components/admin/CmsAboutUsOurJourny";
import CmsAboutDeviceUs from "@/components/admin/CmsAboutDeviceUs";
import CmsAboutStrip from "./CmsAboutStrip";
import CmsAboutMusic from "./CmsAboutMusic";
import CmsHomeSaveAllPage from "./CmsHomeSaveAllPage";

// Mock CmsHomePageTitle component for self-containment
type CmsHomePageTitleProps = {
  title: string;
  text?: string;
  tothyo?: boolean;
};

const CmsHomePageTitle: React.FC<CmsHomePageTitleProps> = ({ title, text }) => (
  <header className="mb-8">
    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
    {text && <p className="text-sm text-gray-500 mt-1">{text}</p>}
  </header>
);

const App = () => {
  // State for managing the editable text fields
  const [pageTitle, setPageTitle] = useState(
    "Our Story of Innovation and Creativity"
  );
  const [pageSubtitle, setPageSubtitle] = useState(
    "We're on a mission to empower everyone to bring their creative visions to life through the perfect blend of cutting-edge AI technology and premium quality products."
  );

  // Custom class for consistent input styling (Shothik input styling-er jonno custom class)
  const inputClass =
    "w-full p-3 text-base text-gray-700 bg-[#f3f3f5] rounded-lg focus:outline-none placeholder-gray-400";
  const labelClass = "block text-base font-medium text-gray-800 mb-2";



  return (
    <div className=" bg-gray-50  ">
      <div>
        {/* Main Form Container - Matching the image's overall look  */}
        <div className="p-6 bg-white rounded-xl border-2 border-[#e8e3dc] ">
          {/* Header Section: About Us Page Content  */}
          <CmsHomePageTitle
            title="About Us Page Content"
            text="Information about your company and values"
            tothyo
          />

          {/* Page Title Input (Page Title Input) */}
          <div className="mb-2">
            <label className={labelClass}>Page Title</label>
            <input
              type="text"
              placeholder="e.g., Our Story of Innovation" // Udahoron: Amader Uddhaboner Golpo
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Page Subtitle Input (Page Subtitle Input) */}
          <div className="mb-6">
            <label className={labelClass}>Page Subtitle</label>
            <textarea
              rows={1} // Use rows for height consistency (Uchchota thik rakhte rows byabohar kora holo)
              placeholder="Describe your company's mission and values" // Apnar company-r lokkho o mullyobodh bishodhhareon korun
              value={pageSubtitle}
              onChange={(e) => setPageSubtitle(e.target.value)}
              className={`${inputClass} resize-none `}
            />
          </div>

          {/* Note: Save button has been removed as per the latest image (Latest chobi onujayi Save button remove kora hoyeche) */}
        </div>

        <CmsAboutUsBeginning />
        <CmsAboutUsFeatureCallout />
        <CmsAboutUsOurJourny />
        <CmsAboutDeviceUs />
        <CmsAboutStrip />
        <CmsAboutMusic />
        <CmsHomeSaveAllPage title="Save All Changes" />
      </div>
      <Toaster />
    </div>
  );
};

export default App;
