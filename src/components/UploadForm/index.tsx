import React, { useState } from 'react';

import XMLDiagram from 'components/XMLDiagram';

const UploadForm: React.FC = () => {
    const [xmlContent, setXmlContent] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file && file.type === 'text/xml') {
            const reader = new FileReader();
            reader.onload = e => {
                setXmlContent(e.target?.result as string);
                setErrorMessage(null);
            };
            reader.onerror = () => {
                setErrorMessage('Error reading file');
                setXmlContent(null);
            };
            reader.readAsText(file);
        } else {
            setErrorMessage('Please select a valid XML file');
            setXmlContent(null);
        }
    };

    return (
        <>
            {xmlContent ? <XMLDiagram xmlString={xmlContent} /> :
                errorMessage ? <div>{errorMessage}</div> :
                    <div className='text-center ml-20'>
                        <input
                            type='file'
                            accept='.xml'
                            onChange={handleFileChange}
                            aria-label='Upload an XML file'
                        />
                    </div>}
        </>
    );
};

export default UploadForm;
