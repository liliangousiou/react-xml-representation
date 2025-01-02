import React, { useState } from 'react';

import XACMLDiagram from 'components/XACMLDiagram';

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
        <div>
            <input
                type='file'
                accept='.xml'
                onChange={handleFileChange}
                aria-label='upload file'
            />
            {errorMessage && <div>{errorMessage}</div>}
            {/* {xmlContent && <TreeDiagram xml={xmlContent} />} */}
            {xmlContent && <XACMLDiagram xacmlString={xmlContent} />}
        </div>
    );
};

export default UploadForm;
