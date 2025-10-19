
import React from 'react';

interface FileUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
}

const FileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, selectedFile }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileSelect(file);
    } else {
      onFileSelect(null);
      alert("Please select a valid PDF file.");
    }
  };

  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
      <h2 className="text-2xl font-bold text-sky-400 mb-4 flex items-center gap-3">
        <FileIcon /> 1. Upload Your Textbook
      </h2>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <label htmlFor="file-upload" className="relative cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 inline-flex items-center">
          <span>Choose a PDF...</span>
          <input id="file-upload" name="file-upload" type="file" accept=".pdf" className="sr-only" onChange={handleFileChange} />
        </label>
        {selectedFile && (
          <p className="text-slate-300 bg-slate-700 px-3 py-1 rounded-md text-sm">
            Selected: <span className="font-semibold">{selectedFile.name}</span>
          </p>
        )}
      </div>
       <p className="text-sm text-slate-500 mt-3">Your document will be securely uploaded for processing via Mathpix and Google Gemini.</p>
    </div>
  );
};
