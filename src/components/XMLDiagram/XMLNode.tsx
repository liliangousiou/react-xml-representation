import React, { useState } from 'react';

import { TreeNode } from 'types';
import { formatNodeAttrValue } from 'utils';

interface XMLNodeProps {
    node: TreeNode;
}

const XMLNode: React.FC<XMLNodeProps> = ({ node }) => {
    // State to manage the collapsibility of each node
    const [isOpen, setIsOpen] = useState(false);  // All nodes collapsed by default

    // Function to toggle the collapsibility of the node
    const toggleNode = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div className="ml-4">
            <div className="border border-black rounded-md mb-2 p-2 bg-white text-black">
                <h2 className="text-center text-xl uppercase flex justify-between items-center">
                    {node.tag.split(':')[1]}

                    {/* Toggle button to collapse/expand */}
                    {node.children.length > 0 && (
                        <button
                            onClick={toggleNode}
                            className="bg-transparent border-0 text-green-700 hover:text-gray-900 text-xl"
                        >
                            {isOpen ? '−' : '+'}
                        </button>
                    )}
                </h2>
                {node.value && <h3 className='text-green-800 my-2'>{node.value}</h3>}

                {/* Render attributes */}
                {Object.entries(node.attributes).map(([key, value]) => (
                    <div key={key} className="mt-2 text-center">
                        {
                            value.includes(':') ?
                                (
                                    <>
                                        <strong className="underline">{key}</strong>
                                        {formatNodeAttrValue(value).map((v, idx) => (
                                            <div key={key + idx}>{v}<br /></div>
                                        ))}
                                    </>
                                ) :
                                (
                                    <>
                                        <strong>{key}</strong> {value}
                                    </>
                                )
                        }
                    </div>
                ))}
            </div>

            {/* Render children only if the node is open */}
            {isOpen && node.children.length > 0 && (
                <div className="ml-4">
                    {node.children.map((child, index) => (
                        <XMLNode key={index} node={child} /> // Recursive rendering for child nodes
                    ))}
                </div>
            )}
        </div>
    );
};

export default XMLNode;
