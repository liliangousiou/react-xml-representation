import React from 'react';

import { XACMLPolicy } from 'types';

interface XACMLAttributesProps {
    policy: XACMLPolicy;
}

const XACMLAttributes: React.FC<XACMLAttributesProps> = ({ policy }) => {
    return (
        <div className='mt-4'>
            <h3>Policy Description</h3>
            <p>{policy.description}</p>
            <h3 className='mt-3'>Attributes</h3>
            <ul>
                {policy.attributes.map((attr, index) => (
                    <li key={index} className='mb-2'>
                        <strong>Attribute ID:</strong> {attr.attributeId}
                        <br />
                        <strong>Category:</strong> {attr.category}
                        <br />
                        <strong>Value:</strong> {attr.value}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default XACMLAttributes;
