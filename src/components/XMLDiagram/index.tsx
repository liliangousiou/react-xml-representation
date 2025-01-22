import React, { useEffect, useState } from 'react';

import { parseXML } from 'utils';

import XMLNode from './XMLNode';

interface XMLDiagramProps {
    xmlString: string;
}

const XMLDiagram: React.FC<XMLDiagramProps> = ({ xmlString }) => {
    const [xmlData, setXmlData] = useState<any>(null);

    useEffect(() => {
        if (xmlString) {
            try {
                const parsedData = parseXML(xmlString);
                setXmlData(parsedData); // Set xml data string
            } catch (error) {
                console.error('Error parsing XML:', error);
                setXmlData(null); // Reset xml data on error
            }
        }
    }, [xmlString]);

    return (
        <>
            {xmlData ? (
                <XMLNode node={xmlData} />
            ) : (
                <div>No valid XML data to display</div>
            )}
        </>
    );
};

export default XMLDiagram;
