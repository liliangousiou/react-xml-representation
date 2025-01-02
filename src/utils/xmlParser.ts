import { TreeNode } from 'types';

// Utility function to parse XML
export const parseXML = (xmlString: string): TreeNode => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    return xmlToTree(xmlDoc.documentElement);
};

// Function to convert XML Element to a tree structure
const xmlToTree = (node: Element): TreeNode => {
    const children = Array.from(node.children).map(xmlToTree);
    const attributes = Array.from(node.attributes).reduce(
        (acc, attr) => {
            acc[attr.name] = attr.value;
            return acc;
        },
        {} as Record<string, string>,
    );

    return {
        tag: node.tagName,
        attributes,
        children,
    };
};
