import {
  UserPlus,
  Clock,
  Send,
  Pause,
  Trash2,
  Zap,
  AlertTriangle,
  Play,
} from "lucide-react";
import React, { useState, useEffect } from "react";

// --- Sub-Component: Modal Structure (for Reusability) ---
type ModalWrapperProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};
const ModalWrapper: React.FC<ModalWrapperProps> = ({ isOpen, onClose, children }) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimatingOpen, setIsAnimatingOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsAnimatingOpen(true), 10);
    } else if (shouldRender) {
      setIsAnimatingOpen(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
    // FIX: Added 'shouldRender' to the dependency array to resolve the ESLint warning.
    // This ensures the unmount logic runs when shouldRender changes from true to false.
  }, [isOpen, shouldRender]);

  if (!shouldRender) return null;

  const handleClose = () => {
    setIsAnimatingOpen(false);
    setTimeout(onClose, 300);
  };

  const modalClasses = `
    bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 
    transition-all duration-300 ease-in-out transform 
    ${isAnimatingOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
  `;
  const backdropClasses = `
    fixed inset-0 z-50 flex items-center justify-center bg-black/50 
    transition-opacity duration-300 
    ${isAnimatingOpen ? "opacity-100" : "opacity-0"}
  `;

  return (
    <div className={backdropClasses} onClick={handleClose}>
      <div className={modalClasses} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

// --- Sub-Component: CreateAutomationModal ---
type CreateAutomationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreateAutomation: (newAutomation: {
    title: string;
    trigger: string;
    delay: string;
    totalSent: number;
    codeSeries: string;
    codesSent: number;
    status: string;
  }) => void;
};

const CreateAutomationModal: React.FC<CreateAutomationModalProps> = ({ isOpen, onClose, onCreateAutomation }) => {
  const [automationName, setAutomationName] = useState("");
  const [triggerType, setTriggerType] = useState("");
  const [delay, setDelay] = useState("");
  const [codeSeries, setCodeSeries] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [startImmediately, setStartImmediately] = useState(true); // Toggle state

  const resetForm = () => {
    setAutomationName("");
    setTriggerType("");
    setDelay("");
    setCodeSeries("");
    setEmailTemplate("");
    setStartImmediately(true);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleCreateAutomation = () => {
    if (!automationName || triggerType === "" || delay === "") return;

    const newAutomation = {
      title: automationName,
      trigger: triggerType,
      delay,
      totalSent: 0, // default value
      codeSeries,
      codesSent: 0, // default value
      status: startImmediately ? "Active" : "Paused", // Set status based on toggle
    };
    onCreateAutomation(newAutomation);
    handleClose();
  };

  // Switch button toggle
  const handleToggle = () => {
    setStartImmediately((prevState) => !prevState); // Toggle the state
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={handleClose}>
      {/* Modal Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-100">
        <div className="flex items-center">
          <Zap className="w-6 h-6 mr-2 text-[#9810FA]" />
          <h2 className="text-xl font-semibold text-gray-800">
            Create New Automation
          </h2>
        </div>
        <button
          onClick={handleClose}
          className="text-[#0a0a0a] hover:text-gray-700 transition duration-150 text-sm"
        >
          Cancel
        </button>
      </div>

      {/* Modal Form Body */}
      <div className="p-6 space-y-6">
        {/* Automation Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Automation Name
          </label>
          <input
            type="text"
            placeholder="e.g., New Customer Welcome"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#9810FA] focus:border-[#9810FA]"
            value={automationName}
            onChange={(e) => setAutomationName(e.target.value)}
          />
        </div>
        {/* Trigger Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trigger Type
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#9810FA] focus:border-[#9810FA]"
            value={triggerType}
            onChange={(e) => setTriggerType(e.target.value)}
          >
            <option value="">Select trigger...</option>
            <option>User Signup</option>
            <option>Item Purchased</option>
            <option>Abandoned Cart</option>
          </select>
        </div>
        {/* Delay / Schedule */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Delay / Schedule
          </label>
          <input
            type="text"
            placeholder="e.g., 24 hours"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={delay}
            onChange={(e) => setDelay(e.target.value)}
          />
        </div>
        {/* Code Series */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Code Series
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={codeSeries}
            onChange={(e) => setCodeSeries(e.target.value)}
          >
            <option value="">Select code series...</option>
            <option>WELCOME10</option>
            <option>FLASH20</option>
          </select>
        </div>
        {/* Email Template */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Template
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            value={emailTemplate}
            onChange={(e) => setEmailTemplate(e.target.value)}
          >
            <option value="">Select template..</option>
            <option>Welcome Email V1</option>
            <option>First Purchase Discount</option>
          </select>
        </div>

        {/* Start Automation Immediately Toggle */}
        <div className="flex justify-between items-center pt-4">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Start Automation Immediately
            </p>
            <p className="text-xs text-gray-500">
              Begin sending codes based on this trigger
            </p>
          </div>
          <label
            htmlFor="start-toggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="start-toggle"
                className="sr-only peer"
                checked={startImmediately} // Controlled by React state
                onChange={handleToggle} // Toggle the state when clicked
              />
              <div className="block bg-gray-200 w-10 h-6 rounded-full peer-checked:bg-[#9810FA]"></div>
              <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform peer-checked:translate-x-4"></div>
            </div>
          </label>
        </div>
      </div>

      {/* Footer / Action Button */}
      <div className="p-6 pt-0">
        <button
          className="w-full py-3 bg-[#9810FA] text-white font-semibold rounded-xl hover:bg-[#860ee0] transition duration-150 "
          onClick={handleCreateAutomation}
          disabled={!automationName || triggerType === "" || delay === ""}
        >
          Create Automation
        </button>
      </div>
    </ModalWrapper>
  );
};

// --- Sub-Component: DeleteConfirmationModal ---
type DeleteConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  automationTitle?: string;
};

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  automationTitle,
}) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center">
        <AlertTriangle className="w-12 h-12 mx-auto text-red-500" />
        <h3 className="mt-4 text-xl font-semibold text-gray-900">
          Confirm Deletion
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          Are you sure you want to delete the automation &ldquo;{automationTitle}
          &ldquo;? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
          >
            Delete Automation
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

// --- Main Component: AutomationCard ---
const AutomationCard = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [automationToDeleteIndex, setAutomationToDeleteIndex] = useState<number | null>(null);

  const [automations, setAutomations] = useState([
    {
      title: "New Customer Welcome",
      trigger: "User Signup",
      delay: "0 minutes",
      totalSent: 3421,
      codeSeries: "WELCOME10",
      codesSent: 3421,
      status: "Active",
    },
    {
      title: "Flash Sale",
      trigger: "Item Purchased",
      delay: "24 hours",
      totalSent: 1200,
      codeSeries: "FLASH20",
      codesSent: 1200,
      status: "Paused",
    },
    {
      title: "Abandoned Cart Reminder",
      trigger: "Abandoned Cart",
      delay: "Immediately",
      totalSent: 5000,
      codeSeries: "REMIND10",
      codesSent: 5000,
      status: "Active",
    },
  ]);

  // --- Create Automation Modal Handlers ---
  const handleOpenCreateModal = () => setIsCreateModalOpen(true);
  const handleCloseCreateModal = () => setIsCreateModalOpen(false);
  const handleCreateAutomation = (newAutomation: { title: string; trigger: string; delay: string; totalSent: number; codeSeries: string; codesSent: number; status: string; }) => {
    setAutomations((prevAutomations) => [...prevAutomations, newAutomation]);
  };

  // --- Pause/Resume Handler ---
  const handlePauseAutomation = (index: number) => {
    setAutomations((prevAutomations) => {
      const updatedAutomations = [...prevAutomations];
      const currentStatus = updatedAutomations[index].status;
      // Toggle status
      updatedAutomations[index].status =
        currentStatus === "Active" ? "Paused" : "Active";
      return updatedAutomations;
    });
  };

  // --- Delete Modal Handlers ---
  const handleOpenDeleteModal = (index: number | null) => {
    setAutomationToDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setAutomationToDeleteIndex(null);
  };

  const confirmDelete = () => {
    if (automationToDeleteIndex !== null) {
      setAutomations((prevAutomations) => {
        const updatedAutomations = prevAutomations.filter(
          (_, i) => i !== automationToDeleteIndex
        );
        return updatedAutomations;
      });
      handleCloseDeleteModal(); // Close the modal and reset index
    }
  };

  // Get the title of the automation to display in the delete modal
  const automationTitleToDelete =
    automationToDeleteIndex !== null
      ? automations[automationToDeleteIndex]?.title
      : "";

  return (
    <div className="bg-gray-50 p-6 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Active Automations
        </h2>
        <button
          className="flex items-center px-4 py-2 bg-[#9810FA] text-white font-medium rounded-lg hover:bg-[#860ee0] transition"
          onClick={handleOpenCreateModal}
        >
          <UserPlus className="w-5 h-5 mr-1" />
          New Automation
        </button>
      </div>

      {automations.map((automation, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl mb-3 p-4 sm:p-6"
        >
          {/* Card Content */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
            <div className="flex items-start flex-grow">
              <div className="w-10 h-10 mr-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#9810FA]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1">
                  {automation.title}
                </h3>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 flex-wrap gap-x-4 gap-y-1">
                  <span className="flex items-center">
                    <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>Trigger: {automation.trigger}</span>
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>Delay: {automation.delay}</span>
                  </span>
                  <span className="flex items-center">
                    <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                    <span>{automation.totalSent.toLocaleString()} sent</span>
                  </span>
                </div>
              </div>
            </div>
            {/* Status Badge */}
            <span
              className={`mt-3 sm:mt-0 px-3 py-1 text-xs font-semibold rounded-full ${
                automations[index].status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {automations[index].status}
            </span>
          </div>
          <hr className="my-5 border-gray-100" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-sm">
            <div>
              <div className="text-gray-500 font-medium mb-1">Code Series</div>
              <div className="text-gray-900 font-semibold">
                {automation.codeSeries}
              </div>
            </div>
            <div>
              <div className="text-gray-500 font-medium mb-1">Codes Sent</div>
              <div className="text-gray-900 font-semibold">
                {automation.codesSent.toLocaleString()}
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="text-gray-500 font-medium mb-1">Status</div>
              <div className="text-gray-900 font-semibold">
                {automations[index].status}{" "}
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-100" />
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => handlePauseAutomation(index)}
              className="flex items-center px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              {automations[index].status === "Active" ? (
                <>
                  <Pause className="w-4 h-4 mr-1" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-1" /> Resume
                </>
              )}
            </button>
            <button
              onClick={() => handleOpenDeleteModal(index)} // Open confirmation modal
              className="flex items-center px-4 py-2 text-sm border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </button>
          </div>
        </div>
      ))}

      {/* Modals */}
      <CreateAutomationModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreateAutomation={handleCreateAutomation}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        automationTitle={automationTitleToDelete}
      />
    </div>
  );
};

export default AutomationCard;