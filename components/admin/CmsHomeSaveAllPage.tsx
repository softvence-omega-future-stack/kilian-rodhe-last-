import React from "react";
import { FileText } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  title?: string;
};

const App = ({ title }: Props) => {
  const handlePublishAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Publishing all changes...");
    toast.success("Sob homepage poriborton live publish hoyeche!", {
      position: "bottom-center",
      icon: "🚀",
    });
  };

  const containerBg =
    "bg-[linear-gradient(90deg,rgba(139,111,71,0.05),rgba(0,0,0,0))]";
  const borderColor = "border-2 border-[#8b6f47]";
  const buttonBg = "bg-[#7a5f3a]";

  return (
    <div className="max-w-full mx-auto font-sans mt-6">
      <div className={`p-6 md:p-8 rounded-xl ${containerBg} ${borderColor}`}>
        {/* flex-col on mobile, flex-row on larger screens */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center w-full gap-4">
          {/* Left: text */}
          <div className="flex-1">
            <h3 className="text-base md:text-lg text-gray-800">{title}</h3>
            <p className="text-sm text-gray-500 mt-1">
              Save all sections at once and publish to your live website
            </p>
          </div>

          {/* Right: button */}
          <button
            onClick={handlePublishAll}
            type="button"
            className={`
              flex items-center justify-center
              text-[14px] py-3 px-5 
              ${buttonBg} text-white rounded-lg
              hover:brightness-110 transition duration-150 ease-in-out 
              hover:shadow-lg focus:outline-none 
              w-full sm:w-auto   /* mobile = full width, desktop = auto */
            `}
          >
            <FileText className="w-5 h-5 mr-3" />
            Publish All Changes
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
