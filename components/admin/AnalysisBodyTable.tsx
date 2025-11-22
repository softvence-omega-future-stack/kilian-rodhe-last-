import React, { useState, useCallback } from "react";
import { Search, Filter, Download, Copy, Eye, Trash2 } from "lucide-react";

// --- TypeScript Interface Definition ---
interface RedeemedBy {
  email: string;
  date: string;
}

interface CouponCode {
  code: string;
  series: string;
  status: "Active" | "Redeemed" | "Expired";
  discount: string;
  redeemedBy: RedeemedBy | null;
  expiry: string;
}

// --- Data Definition (20+ Items) ---
const ALL_CODES: CouponCode[] = [
  {
    code: "SUMMER-A1B2C3D4",
    series: "SUMMER2025",
    status: "Active",
    discount: "10%",
    redeemedBy: null,
    expiry: "2025-12-31",
  },
  {
    code: "SUMMER-E5F6G7H8",
    series: "SUMMER2025",
    status: "Redeemed",
    discount: "10%",
    redeemedBy: { email: "john@example.com", date: "2025-10-25 14:32" },
    expiry: "2025-12-31",
  },
  {
    code: "WELCOME-X9Y8Z7W6",
    series: "WELCOME10",
    status: "Active",
    discount: "€5",
    redeemedBy: null,
    expiry: "2025-11-30",
  },
  {
    code: "VIP-V5U4T3S2",
    series: "VIP20",
    status: "Expired",
    discount: "20%",
    redeemedBy: null,
    expiry: "2025-10-15",
  },
  // Additional Data (17 more items)
  {
    code: "SPRING-G6H5I4J3",
    series: "SPRING2025",
    status: "Active",
    discount: "15%",
    redeemedBy: null,
    expiry: "2025-04-30",
  },
  {
    code: "FALL-K2L1M9N8",
    series: "FALL2024",
    status: "Redeemed",
    discount: "$20",
    redeemedBy: { email: "jane@corp.com", date: "2024-11-05 09:00" },
    expiry: "2024-12-15",
  },
  {
    code: "WINTER-O7P6Q5R4",
    series: "WINTER2026",
    status: "Active",
    discount: "5%",
    redeemedBy: null,
    expiry: "2026-03-01",
  },
  {
    code: "PREVIEW-S3T2U1V0",
    series: "BETA",
    status: "Expired",
    discount: "30%",
    redeemedBy: null,
    expiry: "2024-09-01",
  },
  {
    code: "SALE-A9B8C7D6",
    series: "HOLIDAY",
    status: "Active",
    discount: "50%",
    redeemedBy: null,
    expiry: "2025-01-01",
  },
  {
    code: "SALE-E3F4G5H6",
    series: "HOLIDAY",
    status: "Redeemed",
    discount: "50%",
    redeemedBy: { email: "user1@mail.net", date: "2024-12-24 10:15" },
    expiry: "2025-01-01",
  },
  {
    code: "TEST-T1E2S3T4",
    series: "DEBUG",
    status: "Active",
    discount: "€10",
    redeemedBy: null,
    expiry: "2025-06-30",
  },
  {
    code: "FREESHIP-2025",
    series: "SHIPPING",
    status: "Active",
    discount: "Free Ship",
    redeemedBy: null,
    expiry: "2026-01-01",
  },
  {
    code: "BOGO-Q4W3E2R1",
    series: "PROMO",
    status: "Redeemed",
    discount: "BOGO",
    redeemedBy: { email: "client@biz.io", date: "2025-01-15 11:45" },
    expiry: "2025-02-28",
  },
  {
    code: "LAUNCH-Z9Y8X7W6",
    series: "LAUNCH",
    status: "Active",
    discount: "10%",
    redeemedBy: null,
    expiry: "2025-07-01",
  },
  {
    code: "RETRY-C5V4B3N2",
    series: "RE-ENGAGE",
    status: "Expired",
    discount: "10%",
    redeemedBy: null,
    expiry: "2024-10-01",
  },
  {
    code: "APP-ONLY-P8O7I6U5",
    series: "MOBILE",
    status: "Active",
    discount: "25%",
    redeemedBy: null,
    expiry: "2026-05-30",
  },
  {
    code: "PARTNER-L4K3J2H1",
    series: "AFFILIATE",
    status: "Redeemed",
    discount: "12%",
    redeemedBy: { email: "referral@partner.com", date: "2025-08-10 16:20" },
    expiry: "2025-09-30",
  },
  {
    code: "MAY-M3A2Y1",
    series: "MAYPROMO",
    status: "Active",
    discount: "€25",
    redeemedBy: null,
    expiry: "2025-05-31",
  },
  {
    code: "GIFT-777",
    series: "GIFT",
    status: "Active",
    discount: "$5",
    redeemedBy: null,
    expiry: "2030-01-01",
  },
  {
    code: "EARLYBIRD-999",
    series: "PRE-SALE",
    status: "Active",
    discount: "35%",
    redeemedBy: null,
    expiry: "2025-03-30",
  },
  {
    code: "FLASH-24HR",
    series: "DAILY",
    status: "Expired",
    discount: "10%",
    redeemedBy: null,
    expiry: "2025-11-19",
  },
];
const ITEMS_PER_PAGE = 4;
// --- End Data Definition ---

// --- Custom Toast System (Replacement for react-toastify) ---
const useToast = () => {
  const [toastState, setToastState] = useState<{ visible: boolean, message: string, type: 'success' | 'error' | 'info' }>({ visible: false, message: '', type: 'info' });

  // Function to show the toast notification
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToastState({ visible: true, message, type });
    // Auto-hide the toast after 3 seconds
    setTimeout(() => {
      setToastState(prev => ({ ...prev, visible: false }));
    }, 3000); 
  }, []);

  // Toast Component definition
  const ToastComponent = () => {
    // Only render if visible
    if (!toastState.visible) return null;

    const baseClasses = "fixed bottom-5 right-5 p-4 rounded-xl shadow-2xl z-50 transition-all duration-300 transform";
    let typeClasses = "";

    switch (toastState.type) {
      case 'success':
        typeClasses = "bg-green-600 text-white";
        break;
      case 'error':
        typeClasses = "bg-red-600 text-white";
        break;
      case 'info':
      default:
        typeClasses = "bg-blue-600 text-white";
        break;
    }

    return (
      <div className={`${baseClasses} ${typeClasses}`} role="alert">
        <p className="font-semibold">{toastState.message}</p>
      </div>
    );
  };

  return { showToast, ToastComponent };
};
// --- End Custom Toast System ---


const CouponCodeManager = () => {
  const [activeTab, setActiveTab] = useState<string>("All"); 
  const [searchTerm, setSearchTerm] = useState<string>(""); 
  const [currentPage, setCurrentPage] = useState<number>(1); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); 
  const [selectedCode, setSelectedCode] = useState<CouponCode | null>(null); 
  const [isDeleting, setIsDeleting] = useState<boolean>(false); 
  
  // Use the custom toast hook
  const { showToast, ToastComponent } = useToast();

  // Filtered Codes based on Search and Tab Filter (Active, Redeemed, Expired)
  const filteredCodes = ALL_CODES.filter((code) => {
    const statusFilter = activeTab === "All" || code.status === activeTab;
    const searchFilter =
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.series.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (code.redeemedBy &&
        code.redeemedBy.email.toLowerCase().includes(searchTerm.toLowerCase()));

    return statusFilter && searchFilter;
  });

  // Recalculate totalPages based on filteredCodes length
  const totalPages = Math.ceil(filteredCodes.length / ITEMS_PER_PAGE);

  // Pagination Logic on Filtered Codes
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCodes = filteredCodes.slice(startIndex, endIndex);

  // --- UI Helper Functions ---

  const tabClasses = (tab: string) =>
    `px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
      activeTab === tab
        ? "bg-purple-600 text-white"
        : "text-gray-700 bg-gray-100 hover:bg-gray-200"
    }`;

  const headerButtonClasses =
    "flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors";

  const statusClasses: Record<CouponCode['status'], string> = {
    Active: "bg-green-100 text-green-700",
    Redeemed: "bg-blue-100 text-blue-700",
    Expired: "bg-gray-200 text-gray-700",
  };

  const paginationButtonClasses = (isEnabled: boolean) =>
    `px-4 py-2 text-sm font-medium border rounded-lg transition-colors ${
      isEnabled
        ? "text-gray-700 border-gray-300 hover:bg-gray-50"
        : "text-gray-400 border-gray-200 bg-gray-50 cursor-not-allowed"
    }`;

  // --- Pagination Handlers ---
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };


  const viewingRangeStart = startIndex + 1;
  const viewingRangeEnd = Math.min(endIndex, filteredCodes.length);

  // --- Copy to Clipboard Function ---
  const copyToClipboard = (text: string) => {
    // Note: document.execCommand('copy') is used for compatibility in some sandboxed environments
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    try {
        document.execCommand('copy');
        showToast(`Copied code: ${text}`, 'success');
    } catch (err) {
        console.error('Failed to copy text', err);
        showToast("Failed to copy to clipboard", 'error');
    }
    document.body.removeChild(tempInput);
  };

  // --- Search Highlighting Function ---
  const highlightText = (text: string) => {
    if (!searchTerm) return text;
    // Escape special regex characters
    const escapedSearchTerm = searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escapedSearchTerm})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 font-semibold rounded px-0.5">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // --- Export Function ---
  const handleExport = () => {
    const csvRows = [];
    const headers = [
      "Code",
      "Series",
      "Status",
      "Discount",
      "Redeemed By Email",
      "Redemption Date", 
      "Expiry",
    ];
    csvRows.push(headers.join(","));

    currentCodes.forEach((item) => {
      // Clean up string fields to prevent CSV breaking (replace internal commas with semi-colons or quote)
      const cleanString = (str: string) => `"${str.replace(/"/g, '""').replace(/,/g, ';')}"`;
      
      const redeemedEmail = item.redeemedBy ? cleanString(item.redeemedBy.email) : "N/A";
      const redeemedDate = item.redeemedBy ? cleanString(item.redeemedBy.date) : "N/A";
      
      const row = [
        cleanString(item.code),
        cleanString(item.series),
        cleanString(item.status),
        cleanString(item.discount),
        redeemedEmail,
        redeemedDate,
        cleanString(item.expiry),
      ];
      csvRows.push(row.join(","));
    });

    const csvString = csvRows.join("\n");

    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "coupon_codes.csv");
    link.click();
    showToast("Exporting current page to coupon_codes.csv", 'info');
  };

  // --- Handle Modal Visibility ---
  const openModal = (code: CouponCode) => {
    setSelectedCode(code); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    setSelectedCode(null); 
    setIsDeleting(false); // Ensure deletion modal is also closed
  };

  // --- Handle Delete Confirmation ---
  const confirmDelete = () => {
    // In a real app, this would be an API call to delete the code.
    // Simulating successful deletion:
    showToast(`Coupon code ${selectedCode?.code} deleted successfully!`, 'success');
    // Clear the selected code from the array (since this is static data)
    // NOTE: In a real app with Firestore/API, the list would automatically update.
    // For this static data example, we'll just close the modal.
    closeModal(); 
  };

  const cancelDelete = () => {
    setIsDeleting(false); 
  };

  const deleteCoupon = () => {
    setIsDeleting(true); 
  };

  return (
    <div className="bg-gray-50 font-sans min-h-screen">

      <div className="max-w-6xl mx-auto p-4">
        {/* 1. HEADER/TABS SECTION */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Coupon Code Manager</h1>
          
          {/* Search Bar and Action Buttons */}
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            {/* Search Input Area */}
            <div className="relative flex-grow min-w-[250px] max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by code, series name, or email..."
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); // Reset page on search change
                }}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-purple-500 focus:border-purple-500 text-sm shadow-inner"
              />
            </div>

            {/* Filter and Export Buttons */}
            <div className="flex space-x-3">
              <button
                className={headerButtonClasses}
                onClick={() => showToast("Filter functionality is a planned feature.", 'info')}
              >
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              <button className={headerButtonClasses} onClick={handleExport}>
                <Download className="h-4 w-4" />
                <span>Export Page ({currentCodes.length})</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
            {["All", "Active", "Redeemed", "Expired"].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1); // Reset to first page on tab change
                }}
                className={tabClasses(tab)}
              >
                {tab}
                <span className="ml-2 font-normal text-xs opacity-75">
                  ({ALL_CODES.filter(c => tab === "All" || c.status === tab).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. TABLE/PAGINATION SECTION */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
          {/* Table Structure */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  {[
                    "CODE",
                    "SERIES",
                    "STATUS",
                    "DISCOUNT",
                    "REDEEMED BY",
                    "EXPIRY",
                    "ACTIONS",
                  ].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {currentCodes.map((item) => (
                  <tr key={item.code} className="hover:bg-purple-50">
                    {/* CODE & Copy Button */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="bg-purple-50 px-3 py-1.5 rounded-lg inline-flex items-center border border-purple-200 shadow-sm font-mono">
                        {highlightText(item.code)}
                        <button
                          className="ml-3 text-purple-400 hover:text-purple-600 transition-colors"
                          onClick={() => copyToClipboard(item.code)}
                          title="Copy Code"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                    {/* SERIES */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {highlightText(item.series)}
                    </td>
                    {/* STATUS */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${
                          statusClasses[item.status]
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    {/* DISCOUNT */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold">
                      {item.discount}
                    </td>
                    {/* REDEEMED BY */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.redeemedBy ? (
                        <div className="space-y-0.5">
                          <p className="text-gray-800 font-medium">
                            {highlightText(item.redeemedBy.email)}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.redeemedBy.date}
                          </p>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    {/* EXPIRY */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.expiry}
                    </td>
                    {/* ACTIONS (View and Delete) */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex space-x-3">
                      <button
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors"
                        onClick={() => openModal(item)}
                        title="View Details"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                        onClick={() => {
                            setSelectedCode(item); // Set code for delete dialog
                            deleteCoupon();
                        }} 
                        title="Delete Code"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredCodes.length === 0 && (
              <div className="text-center py-10 text-gray-500 bg-white">
                  <p className="font-medium text-lg">No coupon codes found.</p>
                  <p className="text-sm mt-1">Try adjusting your search or filtering options.</p>
              </div>
            )}
          </div>

          {/* Pagination Footer */}
          <div className="p-4 flex flex-wrap justify-between items-center border-t border-gray-100 bg-white">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold">
                {viewingRangeStart}-{viewingRangeEnd}
              </span>{" "}
              of <span className="font-semibold">{filteredCodes.length}</span>{" "}
              total codes
            </p>
            <div className="flex space-x-2">
              <button
                className={paginationButtonClasses(currentPage > 1)}
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <button
                className={paginationButtonClasses(currentPage < totalPages)}
                onClick={handleNext}
                disabled={currentPage >= totalPages} 
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Viewing Code Details */}
      {isModalOpen && selectedCode && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-3xl max-w-md w-full animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-bold mb-4 text-purple-700 border-b pb-2">Coupon Code Details</h2>
            <div className="space-y-3 text-sm">
                <p className="flex justify-between items-center">
                  <strong className="text-gray-600">Code:</strong> <span className="font-mono bg-purple-100 px-3 py-1 rounded-lg text-purple-800 font-bold">{selectedCode.code}</span>
                </p>
                <p className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <strong className="text-gray-600">Series:</strong> <span className="text-gray-800">{selectedCode.series}</span>
                </p>
                <p className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <strong className="text-gray-600">Status:</strong>{" "}
                  <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full ${statusClasses[selectedCode.status]}`}>
                    {selectedCode.status}
                  </span>
                </p>
                <p className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <strong className="text-gray-600">Discount:</strong> <span className="text-gray-800 font-semibold">{selectedCode.discount}</span>
                </p>
                {selectedCode.redeemedBy ? (
                    <>
                      <p className="flex justify-between items-center border-b border-gray-100 pb-2">
                          <strong className="text-gray-600">Redeemed By:</strong> <a href={`mailto:${selectedCode.redeemedBy.email}`} className="text-blue-600 hover:underline">{selectedCode.redeemedBy.email}</a>
                      </p>
                      <p className="flex justify-between items-center text-xs text-gray-500 pt-1">
                          <strong className="text-gray-700">Redemption Date:</strong> {selectedCode.redeemedBy.date}
                      </p>
                    </>
                ) : (
                    <p className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <strong className="text-gray-600">Redeemed By:</strong> <span className="text-gray-400">N/A</span>
                    </p>
                )}
                <p className="flex justify-between items-center pt-2">
                  <strong className="text-gray-600">Expiry:</strong> <span className="text-gray-800">{selectedCode.expiry}</span>
                </p>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
                <button
                    onClick={deleteCoupon}
                    className="py-2 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors text-sm font-medium flex items-center shadow-md"
                >
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                </button>
                <button
                    onClick={closeModal}
                    className="py-2 px-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors text-sm font-medium shadow-md"
                >
                    Close
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {isDeleting && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-xl shadow-3xl max-w-sm w-full border-t-4 border-red-500 animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-bold mb-4 text-red-600 flex items-center">
              <Trash2 className="h-5 w-5 mr-2"/> Confirm Deletion
            </h3>
            <p className="mb-6 text-gray-700">
                Are you sure you want to permanently delete coupon code <span className="font-mono font-semibold bg-gray-50 px-1 py-0.5 rounded text-gray-900">{selectedCode?.code || 'this code'}</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="py-2 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-100 transition-colors text-sm font-medium shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="py-2 px-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium shadow-md"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Custom Toast Component */}
      <ToastComponent />
    </div>
  );
};

export default CouponCodeManager;