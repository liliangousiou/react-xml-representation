import { XACMLAttribute, XACMLPolicy } from 'types';

// Function to parse XACML policy
export const parseXACML = (xacmlString: string): XACMLPolicy => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xacmlString, 'text/xml');

    const description =
        xmlDoc.getElementsByTagName('xacml3:description')[0]?.textContent || '';

    const attributes: XACMLAttribute[] = [];

    // Extract attributes from the policy
    const matches = xmlDoc.getElementsByTagName('xacml3:match');
    for (let i = 0; i < matches.length; i++) {
        const matchNode = matches[i];

        const attributeValue =
            matchNode.getElementsByTagName('xacml3:attributevalue')[0]
                ?.textContent || '';
        const attributeDesignator = matchNode.getElementsByTagName(
            'xacml3:attributedesignator',
        )[0];

        if (attributeDesignator) {
            const attributeId =
                attributeDesignator.getAttribute('attributeid') || '';
            const category = attributeDesignator.getAttribute('category') || '';
            attributes.push({ attributeId, category, value: attributeValue });
        }
    }

    return { description, attributes };
};
