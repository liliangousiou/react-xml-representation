import React, { useState } from 'react';

import XMLDiagram from 'components/XMLDiagram';
import FileInput from './FileInput';

const UploadForm: React.FC = () => {
    const [xmlContent, setXmlContent] = useState<string | null>(null);

    // Handle file change logic, receive the XML content 
    const handleFileSelect = (content: string | null) => {
        setXmlContent(content);
    };

    return xmlContent ?
        <XMLDiagram xmlString={xmlContent} /> :
        <FileInput onFileSelect={handleFileSelect} />;
};

export default UploadForm;
