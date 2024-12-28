import React, { useState } from 'react';

const UploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target.files;
        if (target && target.length > 0) {
            setFile(target[0]);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (file) {
            // Logic to parse XML file goes here
            console.log('File uploaded:', file.name);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col items-center'>
            <input
                type='file'
                accept='.xml'
                onChange={handleFileChange}
                className='mb-4'
            />
            <button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
            >
                Upload XML
            </button>
        </form>
    );
};

export default UploadForm;
