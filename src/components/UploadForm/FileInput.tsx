import React, { ChangeEventHandler, useState } from 'react';

// Define the type for the callback prop
interface FileInputProps {
    onFileSelect: (xmlContent: string | null) => void; // Callback to send the xmlContent to the parent
}

const FileInput: React.FC<FileInputProps> = ({ onFileSelect }) => {
    const [fileName, setFileName] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Handle file selection and validation
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
        const files = event.target.files;

        if (files && files[0]) {
            const selectedFile = files[0];
            setFileName(selectedFile.name); // Set the file name

            // Reset error message each time a new file is selected
            setErrorMessage(null);

            // Check if the file is an XML file
            if (selectedFile.type === 'text/xml') {
                const reader = new FileReader();

                reader.onload = () => {
                    const fileContent = reader.result as string;
                    // Send the XML content back to the parent
                    onFileSelect(fileContent); // No error, valid file
                };

                reader.onerror = () => {
                    // Handle file read error
                    setErrorMessage('Error reading file');
                    onFileSelect(null); // Send null to parent in case of error
                };

                reader.readAsText(selectedFile);
            } else {
                // If file is not XML
                setErrorMessage('Please select a valid XML file');
                onFileSelect(null); // Send null to parent in case of error
            }
        } else {
            setFileName('No file selected');
            setErrorMessage('No file selected');
            onFileSelect(null); // Send null to parent when no file is selected
        }
    };

    return (
        <div className="flex flex-col items-center">
            {/* Custom Button to Trigger File Selection */}
            <label htmlFor="file-input" className="bg-green-800 text-white py-2 px-4 rounded cursor-pointer hover:bg-green-900">
                Select an XML File
            </label>

            {/* Hidden File Input */}
            <input
                id="file-input"
                type="file"
                accept=".xml"
                onChange={handleFileChange}
                className="hidden"
            />

            {/* Display selected file or default message */}
            <div className="mt-2 text-lg text-gray-200">
                {fileName || 'No file selected'}
            </div>

            {/* Display internal error message */}
            {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}
        </div>
    );
};

export default FileInput;
