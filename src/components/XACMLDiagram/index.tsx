import React, { useEffect, useState } from 'react';

import { XACMLPolicy } from 'types';

import { parseXACML } from 'utils/xacmlParser';

import XACMLAttributes from './XACMLAttributes';

interface XACMLDiagramProps {
    xacmlString: string;
}

const XACMLDiagram: React.FC<XACMLDiagramProps> = ({ xacmlString }) => {
    const [policy, setPolicy] = useState<XACMLPolicy | null>(null);

    useEffect(() => {
        if (xacmlString) {
            try {
                const parsedPolicy = parseXACML(xacmlString);
                setPolicy(parsedPolicy);
            } catch (error) {
                console.error('Error parsing XACML:', error);
                setPolicy(null); // Reset policy on error
            }
        }
    }, [xacmlString]);

    return (
        <div>
            {policy ? (
                <XACMLAttributes policy={policy} />
            ) : (
                <div>No valid XACML data to display</div>
            )}
        </div>
    );
};

export default XACMLDiagram;
