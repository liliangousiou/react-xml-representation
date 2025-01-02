import React, { useEffect, useState } from 'react';

import { parseXML } from 'utils/xmlParser';

import XMLNode from './XMLNode';

interface TreeDiagramProps {
    xmlString: string;
}

const TreeDiagram: React.FC<TreeDiagramProps> = ({ xmlString }) => {
    const [treeData, setTreeData] = useState<any>(null);

    useEffect(() => {
        if (xmlString) {
            try {
                const parsedData = parseXML(xmlString);
                console.log('--->', parsedData);

                setTreeData(parsedData);
            } catch (error) {
                console.error('Error parsing XML:', error);
                setTreeData(null); // Reset tree data on error
            }
        }
    }, [xmlString]);

    return (
        <div>
            {treeData ? (
                <XMLNode node={treeData} />
            ) : (
                <div>No valid XML data to display</div>
            )}
        </div>
    );
};

export default TreeDiagram;
