import React from 'react';

import { TreeNode } from 'types';

interface XMLNodeProps {
    node: TreeNode;
}

const XMLNode: React.FC<XMLNodeProps> = ({ node }) => {
    return (
        <div className='ml-4'>
            <div>
                <strong>{node.tag}</strong>
                {Object.entries(node.attributes).map(([key, value]) => (
                    <span key={key}>
                        {key}={value}
                    </span>
                ))}
            </div>
            {node.children.map((child, index) => (
                <XMLNode key={index} node={child} />
            ))}
        </div>
    );
};

export default XMLNode;
