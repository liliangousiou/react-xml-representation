import { TreeNode } from 'types';

// Utility function to parse XML
export const parseXML = (xmlString: string): TreeNode => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

    // Check for parsing errors
    const error = xmlDoc.querySelector('parsererror');
    if (error) {
        throw new Error('Invalid XML: parse error');
    }

    return xmlToTree(xmlDoc.documentElement);
};

// Function to convert XML Element to a tree structure
export const xmlToTree = (node: Element): TreeNode => {
    // Get the direct text content of the element, excluding text from children
    const value =
        node.firstChild && node.firstChild.nodeType === 3
            ? node.firstChild.textContent?.trim() || ''
            : ''; // Only get textContent of the first child if it's a text node

    // Recursively process the children nodes
    const children = Array.from(node.children).map(xmlToTree);

    // Extract attributes of the node
    const attributes = Array.from(node.attributes).reduce(
        (acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
        },
        {} as Record<string, string>,
    );

    return {
        tag: node.tagName,
        value,
        attributes,
        children,
    };
};

// Function to format node attribute values
export const formatNodeAttrValue = (value: string) => {
    // Split the string by colon ":"
    const parts = value.split(':');

    // Initialize an array to hold the formatted results
    const result = [];

    // Loop through the parts and group them into pairs
    for (let i = 0; i < parts.length; i += 2) {
        // If there's a next part, join current part with the next one
        if (i + 1 < parts.length) {
            result.push(`${parts[i]} ${parts[i + 1]}`);
        } else {
            // If no next part (e.g., last part), just add it as is
            result.push(parts[i]);
        }
    }

    // Join all results with newline character
    return result;
};
