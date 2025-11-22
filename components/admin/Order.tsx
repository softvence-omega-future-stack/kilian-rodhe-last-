import React, { useState, useRef, useEffect } from "react";
import { Search, Eye, ChevronUp, ChevronDown } from "lucide-react";

// Assuming OrderView is a placeholder component for viewing order details
import OrderView from "./OrderView";
import Footer from "./FooterAdmin";

// --- Custom Dropdown Component ---
interface DropdownFilterProps {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const displayValue = selectedValue === options[0] ? title : selectedValue;
  const Icon = isOpen ? ChevronUp : ChevronDown;

  return (
    <div
      className="relative w-full md:w-auto md:min-w-[180px]"
      ref={dropdownRef}
    >
      <button
        onClick={toggleOpen}
        className="w-full px-4 py-2 border border-[#e8e3dc] rounded-xl bg-neutral-100 text-gray-700 focus:outline-none transition duration-200 flex justify-between items-center hover:bg-neutral-200"
      >
        <span className="truncate">{displayValue}</span>
        <Icon className="w-4 h-4 text-gray-500 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 top-full mt-2 w-full min-w-[180px] bg-white rounded-xl shadow-xl border border-gray-200 max-h-60 overflow-y-auto">
          {/* Header based on image */}

          {/* Options */}
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-3 text-sm cursor-pointer hover:bg-gray-100 transition duration-150 ${
                selectedValue === option
                  ? "font-semibold text-gray-900 bg-gray-50"
                  : "text-gray-700"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
// --- End: Custom Dropdown Component ---

// --- New Type Definitions ---
type ViewType = "listOrder" | "add" | "viewOrder" | "editOrder";
type ViewChangeHandler = (view: ViewType, id?: number) => void;

// -----------------------------
// Utility: Title + Paragraph
const Title = ({ text, paragraph }: { text: string; paragraph?: string }) => (
  <div className="flex flex-col space-y-1">
    <h2 className="text-2xl text-gray-800">{text}</h2>
    {paragraph && <p className="text-sm text-gray-500">{paragraph}</p>}
  </div>
);

// --- UPDATED INTERFACE FOR ORDER DATA ---
type OrderStatus = "Processing" | "Completed" | "Shipped" | "Quality Check";
// Match the types from the image's "All Types" dropdown
type OrderDesignType = "AI Generated" | "User Upload" | "Letter/Number";

interface Order {
  id: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  product: string;
  designType: OrderDesignType; // Updated type
  amount: string;
  date: string;
  status: OrderStatus; // Updated type
}

// --- NEW DATA BASED ON THE IMAGE ---
const initialOrderData: Order[] = [
  {
    id: 1,
    orderId: "#ORD-2847",
    customerName: "Emma Schmidt",
    customerEmail: "emma.s@email.com",
    product: "Custom T-Shirt",
    designType: "AI Generated",
    amount: "€34.99",
    date: "Oct 10, 2025",
    status: "Processing",
  },
  {
    id: 2, // Must be unique
    orderId: "#ORD-2846",
    customerName: "Lucas Müller",
    customerEmail: "lucas.m@email.com",
    product: "AI Design Mug",
    designType: "AI Generated",
    amount: "€19.99",
    date: "Oct 10, 2025",
    status: "Completed",
  },
  {
    id: 3, // Must be unique
    orderId: "#ORD-2845",
    customerName: "Sophie Weber",
    customerEmail: "sophie.w@email.com",
    product: "Custom Cap",
    designType: "Letter/Number",
    amount: "€24.99",
    date: "Oct 09, 2025",
    status: "Shipped",
  },
  {
    id: 4, // Must be unique
    orderId: "#ORD-2844",
    customerName: "Noah Fischer",
    customerEmail: "noah.f@email.com",
    product: "Letter Design T-Shirt",
    designType: "Letter/Number",
    amount: "€34.99",
    date: "Oct 09, 2025",
    status: "Processing",
  },
  {
    id: 5, // Must be unique
    orderId: "#ORD-2843",
    customerName: "Mia Becker",
    customerEmail: "mia.b@email.com",
    product: "AI Art Hoodie",
    designType: "AI Generated",
    amount: "€54.99",
    date: "Oct 08, 2025",
    status: "Completed",
  },
  {
    id: 6, // Must be unique
    orderId: "#ORD-2842",
    customerName: "Leon Wagner",
    customerEmail: "leon.w@email.com",
    product: "Custom T-Shirt",
    designType: "User Upload",
    amount: "€34.99",
    date: "Oct 08, 2025",
    status: "Quality Check",
  },
];

// Helper component for the status badge (UPDATED COLORS)
const StatusBadge = ({ status }: { status: OrderStatus }) => {
  const getBadgeStyles = (status: OrderStatus) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Quality Check":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-lg text-xs font-semibold ${getBadgeStyles(
        status
      )}`}
    >
      {status}
    </span>
  );
};

const HighlightText = ({
  text,
  highlight,
}: {
  text: string;
  highlight: string;
}) => {
  if (!highlight.trim()) {
    return <>{text}</>;
  }

  const regex = new RegExp(
    `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span
            key={index}
            className="bg-yellow-200 font-semibold rounded px-0.5"
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
};

// Main Table Component (MODIFIED ACTIONS)
const OrderTable = ({
  data,
  onViewOrder,
  searchTerm,
}: {
  data: Order[];
  onViewOrder: (id: number) => void;
  onEditOrder: (id: number) => void; // Kept for type compatibility
  onDeleteOrder: (id: number) => void; // Kept for type compatibility
  searchTerm: string;
}) => (
  <div className="bg-white rounded-xl border border-[#e8e3dc] overflow-x-auto ">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50 font-bold font-sans text-[#1a1410] text-[14px] ">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider">
            Order ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider">
            Customer
          </th>
          <th className="px-6 py-3 text-left text-xs font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider">
            Product
          </th>
          <th className="px-6 py-3 text-left text-xs  font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider">
            Design Type
          </th>
          <th className="px-6 py-3 text-left text-xs  font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider">
            Amount
          </th>
          <th className="px-6 py-3 text-left text-xs  font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider">
            Date
          </th>
          <th className="px-6 py-3 text-left text-xs  font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-right text-xs  font-bold font-sans text-[#1a1410] text-[14px] uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((order) => (
          <tr
            key={order.id}
            className="hover:bg-gray-50 transition duration-150"
          >
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              <HighlightText text={order.orderId} highlight={searchTerm} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-[14px] font-medium text-[#1a1410]">
              <div className="flex flex-col">
                <HighlightText
                  text={order.customerName}
                  highlight={searchTerm}
                />
                <span className="text-xs text-gray-400">
                  <HighlightText
                    text={order.customerEmail}
                    highlight={searchTerm}
                  />
                </span>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <HighlightText text={order.product} highlight={searchTerm} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <HighlightText text={order.designType} highlight={searchTerm} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
              <HighlightText text={order.amount} highlight={searchTerm} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {order.date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <StatusBadge status={order.status} />
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div className="flex justify-end space-x-4">
                {/* Only View Button Remains */}
                <button
                  onClick={() => onViewOrder(order.id)}
                  className="text-gray-500 hover:text-gray-700 flex items-center space-x-1 p-1 rounded-full hover:bg-gray-100"
                  title="View Details"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    {data.length === 0 && (
      <div className="text-center py-10 text-gray-500">
        No orders found matching your criteria.
      </div>
    )}
  </div>
);

// --- Order List Screen (RENAMED) ---
const OrderListScreen = ({
  onViewChange,
  onDeleteOrder,
  orderData,
}: {
  onViewChange: ViewChangeHandler;
  onDeleteOrder: (id: number) => void;
  orderData: Order[];
}) => {
  // --- State for Filtering ---
  const [searchTerm, setSearchTerm] = useState("");
  // Renamed from selectedProduct to selectedDesignType to match the image's "All Types"
  const [selectedDesignType, setSelectedDesignType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status"); // Updated default to match the dropdown title
  // ---

  const handleViewOrder = (id: number) => {
    onViewChange("viewOrder", id);
  };

  const handleEditOrder = (id: number) => {
    onViewChange("editOrder", id);
  };

  // Custom unique options based on the image's requirements
  const uniqueStatuses = [
    "All Status", // Matches dropdown title
    "Processing",
    "Quality Check",
    "Shipped",
    "Completed",
  ];

  const uniqueDesignTypes = [
    "All Types", // Matches dropdown title
    "AI Generated",
    "User Upload",
    // Keep 'Letter/Number' as it's present in the data, even if not in the minimal image
    ...Array.from(new Set(initialOrderData.map((p) => p.designType))).filter(
      (t) => !["AI Generated", "User Upload"].includes(t)
    ),
  ];

  // Logic to filter the order data
  const filteredOrders = orderData.filter((order) => {
    const searchLower = searchTerm.toLowerCase().trim();

    // 1. Search Term Filter
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchLower) ||
      order.customerName.toLowerCase().includes(searchLower) ||
      order.customerEmail.toLowerCase().includes(searchLower) ||
      order.product.toLowerCase().includes(searchLower) ||
      order.designType.toLowerCase().includes(searchLower) ||
      order.amount.toLowerCase().includes(searchLower);

    // 2. Status Filter (Uses 'All Status' as the default/all value)
    const matchesStatus =
      selectedStatus === "All Status" || order.status === selectedStatus;

    // 3. Design Type Filter (Uses 'All Types' as the default/all value)
    const matchesDesignType =
      selectedDesignType === "All Types" ||
      order.designType === selectedDesignType;

    return matchesSearch && matchesStatus && matchesDesignType;
  });

  return (
    <div className="p-4 sm:p-8 w-full bg-gray-50">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 mb-6">
        <Title
          text="Orders Management"
          paragraph="View and manage all customer orders"
        />
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#e8e3dc] mb-6">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search Input */}
          <div className="relative flex-grow w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search orders, customers, or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-10 py-2 border border-[#e8e3dc] rounded-xl bg-neutral-100 text-gray-800 placeholder-gray-500 focus:outline-none transition duration-200"
            />
          </div>

          {/* 1. Status Dropdown (Custom Component) */}
          <DropdownFilter
            title="All Status"
            options={uniqueStatuses}
            selectedValue={selectedStatus}
            onSelect={setSelectedStatus}
          />

          {/* 2. Types Dropdown (Custom Component) */}
          <DropdownFilter
            title="All Types"
            options={uniqueDesignTypes}
            selectedValue={selectedDesignType}
            onSelect={setSelectedDesignType}
          />
        </div>
      </div>
      {/* --- END: Search and Filters Section --- */}

      {/* Order Table */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="md:col-span-2">
          <OrderTable
            data={filteredOrders}
            onViewOrder={handleViewOrder}
            onEditOrder={handleEditOrder}
            onDeleteOrder={onDeleteOrder}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [orderData, setOrderData] = useState<Order[]>(initialOrderData);
  const [view, setView] = useState<ViewType>("listOrder");
  const [currentOrderId, setCurrentOrderId] = useState<number>(0);

  const handleViewChange: ViewChangeHandler = (newView, id = 0) => {
    setCurrentOrderId(id);
    setView(newView);
  };

  const handleDeleteOrder = (id: number) => {
    const orderToDelete = orderData.find((order) => order.id === id);
    const orderIdText = orderToDelete ? orderToDelete.orderId : `ID: ${id}`;

    const isConfirmed = window.confirm(
      `Are you sure you want to delete order ${orderIdText}?`
    );
    if (isConfirmed) {
      setOrderData((prevData) => prevData.filter((order) => order.id !== id));
      alert(`Order ${orderIdText} deleted successfully.`);
      if (view !== "listOrder" && currentOrderId === id) {
        handleViewChange("listOrder");
      }
    }
  };

  return (
    <div className="mt-4 bg-gray-50">
      {view === "listOrder" && (
        <OrderListScreen
          onViewChange={handleViewChange}
          onDeleteOrder={handleDeleteOrder}
          orderData={orderData}
        />
      )}

      {view === "viewOrder" && currentOrderId > 0 && (
        <OrderView
          onViewChange={(newView: string) =>
            handleViewChange(newView as ViewType)
          }
          productId={currentOrderId}
        />
      )}

      <div className="mt-6 relative -bottom-17">
        <Footer />
      </div>
    </div>
  );
};

export default App;
