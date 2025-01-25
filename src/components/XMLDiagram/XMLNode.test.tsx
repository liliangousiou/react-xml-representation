import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import { TreeNode } from 'types';

import { formatNodeAttrValue } from 'utils';

import XMLNode from './XMLNode';

// Import the XMLNode component to test

// Mock the formatNodeAttrValue function globally to ensure consistent behavior in tests
vi.mock('utils', () => ({
    formatNodeAttrValue: vi.fn().mockReturnValue(['mocked value']), // Mock the function to return a predefined value
}));

// Define a mock TreeNode (a node in the XML tree) with attributes and no children
const mockNode: TreeNode = {
    tag: 'xacml3:attributedesignator',
    value: 'Axiomatics',
    attributes: {
        attributeid: 'urn:org:apache:tomcat:user-attr:clearance',
        mustbepresent: 'false',
    },
    children: [], // No child nodes for this node
};

// Define another mock TreeNode with children to test recursive rendering
const mockNodeWithChildren: TreeNode = {
    tag: 'xacml3:policy',
    value: 'Parent node',
    attributes: { datatype: 'http://www.w3.org/2001/XMLSchema#string' },
    children: [
        {
            tag: 'xacml3:description',
            value: 'Policy description',
            attributes: {},
            children: [],
        },
    ],
};

describe('XMLNode Component', () => {
    test('renders node tag and value correctly', () => {
        // Render the XMLNode component with mockNode
        render(<XMLNode node={mockNode} />);

        // Assert that the tag (case-insensitive match) and value appear in the document
        expect(screen.getByText(/attributedesignator/i)).toBeInTheDocument(); // Match tag (case-insensitive)
        expect(screen.getByText('Axiomatics')).toBeInTheDocument(); // Match node value
    });

    test('toggles child nodes visibility when the collapse/expand button is clicked', () => {
        // Render the XMLNode component with mockNodeWithChildren
        render(<XMLNode node={mockNodeWithChildren} />);

        // Initially, the child node ('Policy description') should not be visible
        expect(screen.queryByText('Policy description')).toBeNull(); // Ensure it's not in the document

        // Simulate a click on the expand button (plus sign)
        fireEvent.click(screen.getByText('+'));
        expect(screen.getByText('Policy description')).toBeInTheDocument();

        // Simulate a click on the collapse button (minus sign)
        fireEvent.click(screen.getByText('−'));
        expect(screen.queryByText('Policy description')).toBeNull();
    });

    test('renders attributes without colons correctly', () => {
        // Render the XMLNode component with mockNode
        render(<XMLNode node={mockNode} />);

        // Assert that the attribute key ('mustbepresent') and its value ('false') are rendered correctly
        expect(screen.getByText('mustbepresent')).toBeInTheDocument(); // Render attribute key
        expect(screen.getByText('false')).toBeInTheDocument(); // Render attribute value
    });

    test('renders child nodes recursively when parent node is expanded', () => {
        // Render the XMLNode component with mockNodeWithChildren
        render(<XMLNode node={mockNodeWithChildren} />);

        // Initially, the child node ('Policy description') should not be visible
        expect(screen.queryByText('Policy description')).toBeNull();
        fireEvent.click(screen.getByText('+'));

        // After expanding, the child node should be visible
        expect(screen.getByText('Policy description')).toBeInTheDocument();
    });

    test('calls formatNodeAttrValue with correct values', () => {
        // Render the XMLNode component with mockNode
        render(<XMLNode node={mockNode} />);

        // Assert that the formatNodeAttrValue function is called with the correct attribute value
        expect(formatNodeAttrValue).toHaveBeenCalledWith(
            'urn:org:apache:tomcat:user-attr:clearance', // Correct attribute value
        );

        // Assert that the function is NOT called with the 'false' value (since it's not an attribute)
        expect(formatNodeAttrValue).not.toHaveBeenCalledWith('false');
    });
});
