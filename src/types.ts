// Define the structure for the xml node
export interface TreeNode {
    tag: string;
    attributes: Record<string, string>;
    children: TreeNode[];
}

// Define the structure for the xacml node
export interface XACMLAttribute {
    attributeId: string;
    category: string;
    value: string;
}

export interface XACMLPolicy {
    description: string;
    attributes: XACMLAttribute[];
}
