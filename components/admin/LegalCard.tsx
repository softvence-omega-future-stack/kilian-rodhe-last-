import React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";

// 1️⃣ Define props interface with the corrected prop name
interface PrivacyPolicyFormProps {
  title: string;
  paragraph: string;
  inputFieldText: string;
  buttenText: string; // ✅ Corrected from 'buttenText' to 'buttonText'
}

const handleSaveSettings = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  console.log("Saving settings...");

  // This will now successfully display because <Toaster /> is rendered below
  toast.success("Saved successfully!", {
    position: "bottom-center",
    duration: 3000,
  });
};

// 2️⃣ Apply the interface and use the corrected prop name
const PrivacyPolicyForm: React.FC<PrivacyPolicyFormProps> = ({
  title,
  paragraph,
  inputFieldText,
  buttenText, // ✅ Using the corrected prop name
}) => {
  return (
    <div className="my-10 p-6 bg-white rounded-xl border border-[#e8e3dc]">
      {/* --- Header Section --- */}
      <header className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-base text-gray-500">{paragraph}</p>
      </header>

      {/* --- Textarea Container --- */}
      <div className="mb-6">
        <textarea
          className="w-full h-40 p-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-400"
          placeholder={inputFieldText}
          // You might want to manage the value with React state (useState) here
        />
      </div>

      {/* --- Save Button --- */}
      <button
        onClick={handleSaveSettings}
        // Removed type="submit" for cleaner behavior outside of a formal <form> tag
        className="w-full flex items-center justify-center py-3 px-4 
                   bg-[linear-gradient(180deg,#8b6f47,#7a5f3a)] text-white font-semibold rounded-lg 
                   hover:bg-amber-900 transition duration-150 ease-in-out 
                    hover:shadow-lg"
      >
        <DocumentTextIcon className="w-5 h-5 mr-3" />
        {buttenText} {/* ✅ This text will show up now */}
      </button>
      <Toaster />
    </div>
  );
};

export default PrivacyPolicyForm;
