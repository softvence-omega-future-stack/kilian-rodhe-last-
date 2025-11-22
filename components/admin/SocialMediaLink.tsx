import React from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  CheckCircle,
  Save,
} from "lucide-react";

// --- Props Interface for SocialInputField ---
interface SocialInputFieldProps {
  Icon: React.ElementType; // ✅ React component
  label: string;
  defaultValue: string;
  iconClass?: string;
  inputBg?: string;
  borderColor?: string;
}

// --- SocialInputField Component ---
const SocialInputField: React.FC<SocialInputFieldProps> = ({
  Icon,
  label,
  defaultValue,
  iconClass = "",
  inputBg = "",
  borderColor = "",
}) => (
  <div className="flex flex-col space-y-2">
    <label
      htmlFor={label.toLowerCase().replace(/ /g, "-")}
      className="flex items-center text-sm font-medium text-gray-700"
    >
      <Icon className={`w-4 h-4 mr-2 ${iconClass}`} />
      {label}
    </label>
    <input
      id={label.toLowerCase().replace(/ /g, "-")}
      type="url"
      defaultValue={defaultValue}
      className={`w-full p-3 ${inputBg} border-2 ${borderColor} rounded-xl focus:outline-none transition duration-150`}
    />
  </div>
);

// --- SocialMediaLinksForm Component ---
const SocialMediaLinksForm: React.FC = () => {
  const inputBg = "bg-gray-100";
  const borderColor = "border-[#e8e3dc]";

  const handleSaveSocialLinks = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Social Media Links Saved Successfully!", {
      position: "bottom-center",
      duration: 3000,
    });
  };

  return (
    <form
      onSubmit={handleSaveSocialLinks}
      className={`bg-white p-6 md:p-8 rounded-xl border-2 ${borderColor}`}
    >
      <div className="flex justify-between items-start mb-6 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Social Media Links
          </h2>
          <p className="text-sm text-gray-500">
            Connect your social media profiles
          </p>
        </div>
        <div className="p-3 bg-purple-50 text-purple-500 rounded-lg">
          <Globe className="h-6 w-6" />
        </div>
      </div>

      <div className="space-y-6">
        <SocialInputField
          Icon={Facebook}
          label="Facebook"
          defaultValue="https://facebook.com/thundra"
          iconClass="text-blue-600"
          inputBg={inputBg}
          borderColor={borderColor}
        />
        <SocialInputField
          Icon={Instagram}
          label="Instagram"
          defaultValue="https://instagram.com/thundra"
          iconClass="text-pink-600"
          inputBg={inputBg}
          borderColor={borderColor}
        />
        <SocialInputField
          Icon={Twitter}
          label="Twitter / X"
          defaultValue="https://twitter.com/thundra"
          iconClass="text-blue-400"
          inputBg={inputBg}
          borderColor={borderColor}
        />
        <SocialInputField
          Icon={Linkedin}
          label="LinkedIn"
          defaultValue="https://linkedin.com/company/thundra"
          iconClass="text-blue-700"
          inputBg={inputBg}
          borderColor={borderColor}
        />

        <div
          className={`flex items-center p-4 rounded-xl border-2 ${borderColor} bg-white mt-8`}
        >
          <CheckCircle className="w-5 h-5 mr-3 text-blue-500" />
          <p className="text-sm text-gray-700">
            Social media links will appear in your website footer and contact
            page
          </p>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-xl text-white focus:outline-none transition duration-150"
          style={{ background: "linear-gradient(180deg, #8b6f47, #7a5f3a)" }}
        >
          <Save className="h-5 w-5 mr-2" />
          Save Social Media Links
        </button>
      </div>
    </form>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  return (
    <div className="bg-gray-50">
      <SocialMediaLinksForm />
      <Toaster position="bottom-center" />
    </div>
  );
};

export default App;
