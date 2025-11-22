import React from "react";
import HomeHeroBanner from "@/components/admin/HomeHeroBanner";
import HomeCuratedCollection from "@/components/admin/HomeCuratedCollections";
import CmsHomeMidPageBanner from "@/components/admin/CmsHomeMidPageBanner";
import CmsHomeProductSystem from "@/components/admin/CmsHomeProductSystem";
import CmsHomeTechknolodgy from "@/components/admin/CmsHomeTechknology";
import CmsHomeFeatureIcon from "@/components/admin/CmsHomeFeatureIcon";
import CmsHomeNewsletterSignup from "@/components/admin/CmsHomeNewsletterSignup";
import CmsHomeSaveAllPage from "@/components/admin/CmsHomeSaveAllPage";
const CmsHome = () => {
  return (
    <>
      <HomeHeroBanner />
      <div className="grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 ">
        <HomeCuratedCollection />
        <CmsHomeMidPageBanner />
        <CmsHomeProductSystem />
        <CmsHomeTechknolodgy />
        <CmsHomeFeatureIcon />
        <CmsHomeNewsletterSignup />
      </div>
      <CmsHomeSaveAllPage title="Save All Homepage Changes" />
    </>
  );
};

export default CmsHome;
