import React from "react";
import Card from "./Card";

import dollerIcon from "@/public/image/admin/dashboard/doller.svg";
import shopIcon from "@/public/image/admin/dashboard/shop.svg";
import userIcon from "@/public/image/admin/dashboard/userIcon.svg";
import aiIcon from "@/public/image/admin/dashboard/ai.svg";
import RecentOrders from "./Recentorder";
import TopProducts from "./Topproducts";
import FooterAdmin from "./FooterAdmin";
import Title from "./Title";

const DashboardContent = () => (
  <div>
    <div className="p-4 sm:p-8">
      <Title
        text="Dashboard Overview"
        paragraph="Welcome back! Here's what's happening with your store today."
      />
      <div className="grid grid-cols-1 w-full mb-6 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          icon={dollerIcon}
          percent="+12.0%"
          total="12,847"
          text="Total Revenue"
        />
        <Card icon={shopIcon} percent="+8.2%" total="256" text="Orders" />
        <Card icon={userIcon} percent="+15.3%" total="1,834" text="Customers" />
        <Card icon={aiIcon} percent="+23.1%" total="432" text="AI Designs" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <RecentOrders />
        </div>
        <div>
          <TopProducts />
        </div>
      </div>
    </div>

    <div>
      <FooterAdmin />
    </div>
  </div>
);

export default DashboardContent;
