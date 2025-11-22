import React, { useState } from "react"; // Import useState
import Image, { StaticImageData } from "next/image";
import { Bell } from "lucide-react";

import rightIcon from "@/public/image/admin/notification/right.svg";
import rightWhiteIcon from "@/public/image/admin/notification/Icon (1).svg";
import userIcon from "@/public/image/admin/notification/Icon (2).svg";
import shopIcon from "@/public/image/admin/notification/Icon.svg";
import bellIcon from "@/public/image/admin/notification/bell.svg";

// Icon = Image or SVG React Component (e.g., lucide-react icons)
type SVGIcon = React.ComponentType<React.ComponentProps<"svg">>;
type IconType = StaticImageData | SVGIcon;

interface NotificationItemProps {
  icon: IconType;
  color: string;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
}

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// -----------------------------
// Notification Data
// -----------------------------

const notificationsData: NotificationItemProps[] = [
  {
    icon: shopIcon,
    color: "text-blue-500 bg-blue-100",
    title: "New Order Received",
    detail: "Emma Schmidt placed an order for Custom T-Shirt",
    time: "5 min ago",
    unread: true,
  },
  {
    icon: rightWhiteIcon,
    color: "text-purple-500 bg-purple-100",
    title: "Quality Check Required",
    detail: "Order #ORD-2842 needs quality verification",
    time: "15 min ago",
    unread: true,
  },
  {
    icon: userIcon,
    color: "text-green-500 bg-green-100",
    title: "AI Design Generated",
    detail: "Customer created a new AI design",
    time: "1 hour ago",
    unread: true,
  },
  {
    icon: bellIcon,
    color: "text-red-500 bg-red-100",
    title: "Low Stock Alert",
    detail: "Women's Premium T-Shirt is out of stock",
    time: "2 hours ago",
    unread: false,
  },
];

// -----------------------------
// Notification Item Component
// -----------------------------

const NotificationItem: React.FC<NotificationItemProps> = ({
  icon,
  color,
  title,
  detail,
  time,
  unread,
}) => {
  const isImage = typeof icon !== "function";

  let bgClass = color;

  // Custom gradients override - simplified for demonstration, kept original logic
  if (title === "AI Design Generated" || title === "Low Stock Alert") {
    bgClass =
      "rounded-[8px] bg-[linear-gradient(135deg,#00C950_0%,#00A63E_100%)]";
  } else {
    bgClass =
      "rounded-[8px] bg-[linear-gradient(135deg,#AD46FF_0%,#9810FA_100%)]";
  }

  const IconComponent = icon as SVGIcon;

  return (
    <div className="flex items-start p-4 hover:bg-gray-50 transition duration-150 border-b-2 border-[#E8E3DC] bg-[linear-gradient(90deg,rgba(239,246,255,0.5)_0%,rgba(0,0,0,0)_100%)] last:border-b-0 animate-fadeIn">
      <div
        className={`flex items-center justify-center w-9 h-9 min-w-9 mr-3 ${bgClass}`}
      >
        {isImage ? (
          <Image src={icon as StaticImageData} alt="icon" className="w-5 h-5" />
        ) : (
          <IconComponent className="w-5 h-5 text-white" />
        )}
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <p className="text-gray-800 font-medium text-sm">{title}</p>
          {unread && (
            <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
          )}
        </div>

        <p className="text-gray-600 text-xs mt-0.5">{detail}</p>
        <p className="text-gray-400 text-[10px] mt-1">{time}</p>
      </div>
    </div>
  );
};

// -----------------------------
// Notifications Panel Component
// -----------------------------

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({ isOpen }) => {
  // 1. State to control showing all vs. limited notifications
  const [showAll, setShowAll] = useState(false);

  if (!isOpen) return null;

  const unreadCount = notificationsData.filter((n) => n.unread).length;

  // 2. Determine which notifications to display
  const displayNotifications = showAll
    ? notificationsData
    : notificationsData.slice(0, 3); // Show only the first 3 if not showing all

  const handleToggleView = () => {
    setShowAll((prev) => !prev);
  };

  const buttonText = showAll ? "Show Less" : "View All";

  return (
    <div className="absolute -right-15 top-10 lg:right-0 lg:mt-2 w-80 bg-white border-[1.173px] rounded-md border-[#E8E3DC] shadow-2xl z-50 origin-top-right animate-scaleIn">
      {/* Header */}
      <div className="flex items-center justify-between bg-[linear-gradient(90deg,rgba(139,111,71,0.05)_0%,rgba(139,111,71,0.10)_100%)] p-4 border-b-[1.173px] border-[#E8E3DC]">
        <div className="flex items-center">
          <div className="bg-[#8B6F47] flex justify-center mr-1.5 items-center p-2 rounded-lg">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-lg font-semibold text-stone-800">
            Notifications
          </h2>
        </div>

        {unreadCount > 0 && (
          <span className="bg-[#8B6F47] text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {unreadCount} new
          </span>
        )}
      </div>

      {/* List */}
      <div className="max-h-96 overflow-y-auto">
        {/* 3. Render the filtered list */}
        {displayNotifications.map((n, index) => (
          <NotificationItem key={index} {...n} />
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 flex justify-between items-center border-t border-gray-100">
        <button className="flex items-end text-sm font-medium text-gray-500 hover:text-gray-700 transition">
          <Image src={rightIcon} alt="icon" height={20} width={20} />
          Mark all as read
        </button>

        {/* 4. Toggle Button with Animation */}
        <button
          onClick={handleToggleView}
          className={`px-3 py-1.5 text-sm font-medium bg-[#8B6F47] text-white rounded-lg transition-colors hover:bg-[#6e593d] animate-buttonChange`}
        >
          {buttonText}
        </button>
      </div>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-5px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes buttonChange {
          0% {
            opacity: 0.8;
            transform: scale(0.98);
          }
          50% {
            opacity: 1;
            transform: scale(1.02);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-buttonChange {
          animation: buttonChange 0.15s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NotificationsPanel;
