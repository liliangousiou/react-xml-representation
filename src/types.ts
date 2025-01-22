// Define the structure for the xml node
export interface TreeNode {
    tag: string;
    value?: string;
    attributes: Record<string, string>;
    children: TreeNode[];
}
