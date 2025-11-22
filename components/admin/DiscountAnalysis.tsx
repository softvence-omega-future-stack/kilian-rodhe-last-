import React from "react";
import { DollarSign, Percent, CheckCircle, Users } from "lucide-react";

// Assuming these imports work as image components or paths in your environment
import IncreamentIcon from "@/public/image/admin/Discount/increament.svg";
import DecreamentIcon from "@/public/image/admin/Discount/decrement.svg";
import Image from "next/image";
import AnaliseTopPerformance from "./AnaliseTopPerformance";
import AnalysisRecent from "./AnalysisRecent Redemptions";
import AnalysisEmailPerformance from "./AnalysisEmailPerformance";
import AnalysisTime from "./AnalysisTime";
import AnalysisExport from "./AnalysisExport";

// --- Sub-Component: MetricCard ---
// Reusable component for displaying individual metric boxes
type ChangeColor = "green" | "red";

interface MetricCardProps {
  icon: React.ComponentType<{ className?: string }>;
  iconBgColor: string;
  iconTextColor: string;
  title: string;
  value: string;
  change: string;
  changeColor: ChangeColor;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  iconBgColor,
  iconTextColor,
  title,
  value,
  change,
  changeColor,
}) => {
  // Determine text color for the change indicator (green for positive, red for negative)
  const changeClasses = `flex items-center text-sm font-semibold ${
    changeColor === "green" ? "text-green-600" : "text-red-600"
  }`;

  // Determine the trend image source
  const TrendImage = changeColor === "green" ? IncreamentIcon : DecreamentIcon;

  return (
    <div className="bg-white p-6 rounded-xl border-[1.2px] border-solid border-black/10 flex flex-col justify-between">
      {/* Icon and Change Indicator */}
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBgColor}`}
        >
          <Icon className={`w-5 h-5 ${iconTextColor}`} />
        </div>
        <div className={changeClasses}>
          {/* Use the imported image component or path */}
          <Image
            src={TrendImage}
            alt={changeColor === "green" ? "Increment" : "Decrement"}
            className="w-4 h-4 mr-1"
          />
          {change}
        </div>
      </div>

      {/* Value */}
      <h3 className="text-3xl font-bold text-gray-900 mb-4">{value}</h3>

      {/* Title */}
      <p className="text-sm text-gray-500 font-medium">{title}</p>
    </div>
  );
};

// --- Main Component: AnalyticsDashboard ---
const AnalyticsDashboard = () => {
  const metrics: MetricCardProps[] = [
    {
      icon: DollarSign,
      iconBgColor: "bg-green-100",
      iconTextColor: "text-green-500",
      title: "Total Revenue from Codes",
      value: "€245,892",
      change: "+12.5%",
      changeColor: "green",
    },
    {
      icon: Percent,
      iconBgColor: "bg-blue-100",
      iconTextColor: "text-blue-500",
      title: "Average Discount Used",
      value: "€12.50",
      change: "-2.3%",
      changeColor: "red",
    },
    {
      icon: CheckCircle,
      iconBgColor: "bg-purple-100",
      iconTextColor: "text-purple-500",
      title: "Code Redemption Rate",
      value: "71.8%",
      change: "+5.2%",
      changeColor: "green",
    },
    {
      icon: Users,
      iconBgColor: "bg-orange-100",
      iconTextColor: "text-orange-500",
      title: "Unique Customers",
      value: "8,942",
      change: "+18.4%",
      changeColor: "green",
    },
  ];

  return (
    <div className=" bg-gray-50 ">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-[#0a0a0a] font-semibold text-[30px]">
          Analytics & Reports
        </h1>
        <p className="text-gray-500 mt-1">
          Track performance and insights for your discount codes
        </p>
      </div>

      {/* Metrics Grid */}
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard
            key={index}
            icon={metric.icon}
            iconBgColor={metric.iconBgColor}
            iconTextColor={metric.iconTextColor}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            changeColor={metric.changeColor}
          />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {/* First component: AnaliseTopPerformance */}
        <div>
          <AnaliseTopPerformance />
        </div>

        {/* Second component: AnalysisRecent */}
        <div>
          <AnalysisRecent />
        </div>
      </div>

      <div>
        <AnalysisEmailPerformance />
      </div>

      <div>
        <AnalysisTime />
      </div>

      <div>
        <AnalysisExport />
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
