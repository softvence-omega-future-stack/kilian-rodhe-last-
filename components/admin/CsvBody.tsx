import React, { useState } from "react";
import { AlertTriangle, FileText, UploadIcon, X } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

type UploadMessage = {
type: "error" | "success" | "info";
text: string;
};

const CsvUploader = () => {
const [file, setFile] = useState<File | null>(null);
const [isDragging, setIsDragging] = useState(false);
const [uploadMessage, setUploadMessage] = useState<UploadMessage | null>(null);

const validateAndSetFile = (selectedFile: File | null | undefined) => {
setUploadMessage(null);
if (!selectedFile) return false;


if (selectedFile.type !== "text/csv") {  
  setUploadMessage({  
    type: "error",  
    text: "Invalid file type. Only CSV files are allowed.",  
  });  
  setFile(null);  
  return false;  
}  

if (selectedFile.size > MAX_FILE_SIZE) {  
  const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(2);  
  setUploadMessage({  
    type: "error",  
    text: `File size exceeds 10MB limit. Current size: ${sizeMB} MB.`,  
  });  
  setFile(null);  
  return false;  
}  

setFile(selectedFile);  
return true;  


};

const handleFileChange = (
e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>
) => {
let selectedFile: File | undefined;


if ("dataTransfer" in e && e.dataTransfer.files && e.dataTransfer.files.length > 0) {  
  selectedFile = e.dataTransfer.files[0];  
} else if ("target" in e) {  
  const input = e.target as HTMLInputElement;  
  if (input.files && input.files.length > 0) {  
    selectedFile = input.files[0];  
  }  
}  

validateAndSetFile(selectedFile ?? null);  
setIsDragging(false);  


};

const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
e.preventDefault();
setIsDragging(true);
};

const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
e.preventDefault();
if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
setIsDragging(false);
};

const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
e.preventDefault();
handleFileChange(e);
};

const handleRemoveFile = () => {
setFile(null);
setUploadMessage(null);
};

const handleUpload = () => {
if (!file) {
setUploadMessage({ type: "error", text: "Please select a file first." });
return;
}


setUploadMessage({ type: "info", text: "Upload in progress..." });  
console.log("Starting upload for file:", file.name);  

setTimeout(() => {  
  setUploadMessage({  
    type: "success",  
    text: `${file.name} uploaded successfully! Processing started.`,  
  });  
  setFile(null);  
}, 3000);  


};

const renderUploadArea = () => {
const dropZoneClasses = `  
      bg-white border-2 rounded-lg p-8 h-80 flex items-center justify-center mb-6 transition-all duration-200  
      ${isDragging ? "border-purple-500 bg-purple-50 border-dashed" : "border-gray-300 border-solid"}  
    `;

return (  
  <div  
    className={dropZoneClasses}  
    onDragOver={(e) => e.preventDefault()}  
    onDragEnter={handleDragEnter}  
    onDragLeave={handleDragLeave}  
    onDrop={handleDrop}  
  >  
    <div className="text-center">  
      {file ? (  
        <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex items-center justify-between">  
          <div className="flex items-center">  
            <FileText className="w-6 h-6 text-purple-600 mr-3" />  
            <span className="text-sm font-medium text-gray-800 truncate max-w-[150px]">{file.name}</span>  
          </div>  
          <button  
            onClick={handleRemoveFile}  
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"  
            aria-label="Remove file"  
          >  
            <X className="w-4 h-4" />  
          </button>  
        </div>  
      ) : (  
        <>  
          <UploadIcon className="w-12 h-12 mx-auto text-gray-400" />  
          <p className="mt-4 text-sm text-gray-600">  
            <label htmlFor="file-upload" className="font-medium text-purple-600 hover:text-purple-500 cursor-pointer">  
              Click to upload  
            </label>{" "}  
            or drag and drop  
          </p>  
        </>  
      )}  

      <p className="mt-1 text-xs text-gray-500">CSV files only (max 10MB)</p>  

      <input  
        id="file-upload"  
        name="file-upload"  
        type="file"  
        accept=".csv"  
        onChange={handleFileChange}  
        className="sr-only"  
      />  
    </div>  
  </div>  
);  


};

return ( <div className="p-4 sm:p-6 lg:p-8"> <div className="p-8 border-2 rounded-lg border-black/10"> <h1 className="text-xl font-semibold text-gray-800 mb-6">Upload CSV File</h1>

    {renderUploadArea()}  

    {uploadMessage && (  
      <div  
        className={`p-3 rounded-lg mb-6 text-sm ${  
          uploadMessage.type === "error"  
            ? "bg-red-100 text-red-700 border border-red-300"  
            : uploadMessage.type === "success"  
            ? "bg-green-100 text-green-700 border border-green-300"  
            : "bg-blue-100 text-blue-700 border border-blue-300"  
        }`}  
      >  
        {uploadMessage.text}  
      </div>  
    )}  

    {file && uploadMessage?.type !== "info" && (  
      <div className="flex justify-center mb-8">  
        <button  
          onClick={handleUpload}  
          className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition duration-150"  
        >  
          Upload {file.name}  
        </button>  
      </div>  
    )}  
  </div>  

  <div className="bg-yellow-50 border mt-4 border-yellow-400 p-4 rounded-lg">  
    <div className="flex">  
      <div className="flex-shrink-0">  
        <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />  
      </div>  
      <div className="ml-3">  
        <p className="text-sm font-medium"><span className="font-medium text-[#733E0A]">Important:</span></p>  
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] text-[#894B00]">  
          <li>All imported codes must be globally unique (system will check for duplicates)</li>  
          <li>One-time use is enforced - codes become invalid after first redemption</li>  
          <li>If recipient_email is provided, codes will be automatically queued for email delivery</li>  
          <li>Large imports may take a few minutes to process</li>  
          <li>You&apos;ll receive a summary report after import completion</li>  
        </ul>  
      </div>  
    </div>  
  </div>  
</div>  


);
};

export default CsvUploader;
