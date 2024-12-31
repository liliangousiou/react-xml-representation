import React from 'react';
import XMLViewer from 'react-xml-viewer';

interface TreeDiagramProps {
    xml: string;
}

const TreeDiagram: React.FC<TreeDiagramProps> = ({ xml }) => {
    return <XMLViewer xml={xml} />;
};

export default TreeDiagram;
