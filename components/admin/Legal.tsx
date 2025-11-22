import React from "react";
import LegalCard from "@/components/admin/LegalCard";

const Legal = () => {
  return (
    <div className="w-full p-4 ">
      {/* Flex container: 1 column on mobile, 2 columns from md+ */}
      <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
        <div className="w-full md:w-[48%] lg:w-1/2">
          <LegalCard
            title="Privacy Policy"
            paragraph="GDPR-compliant privacy policy (German law)"
            inputFieldText="Enter your privacy policy content..."
            buttenText="Save Privacy Policy"
          />
        </div>

        <div className="w-full md:w-[48%]">
          <LegalCard
            title="Terms & Conditions"
            paragraph="Service terms and conditions"
            inputFieldText="Enter your terms and conditions..."
            buttenText="Save Terms & Conditions"
          />
        </div>

        <div className="w-full md:w-[48%]">
          <LegalCard
            title="Shipping Policy"
            paragraph="Shipping and delivery information"
            inputFieldText="Enter your shipping policy..."
            buttenText="Save Shipping Policy"
          />
        </div>

        <div className="w-full md:w-[48%]">
          <LegalCard
            title="Return & Refund Policy"
            paragraph="Returns and refunds information"
            inputFieldText="Enter your return and refund policy..."
            buttenText="Save Return Policy"
          />
        </div>
      </div>
    </div>
  );
};

export default Legal;
