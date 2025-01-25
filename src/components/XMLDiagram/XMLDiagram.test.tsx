import { render, screen } from '@testing-library/react';
import { expect, vi } from 'vitest';

import { parseXML } from 'utils';

import XMLDiagram from '.';

// Mock the utility function parseXML and the XMLNode component
vi.mock('utils', () => ({
    parseXML: vi.fn(), // Mock the parseXML function so we can control its behavior in tests
}));

// Mock the XMLNode component to isolate the tests from the actual implementation
vi.mock('./XMLNode', () => ({
    default: () => <div>Mocked XMLNode</div>, // Return a simple mocked component for XMLNode
}));

describe('XMLDiagram', () => {
    // Reset mocks after each test to ensure they don't interfere with other tests
    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should render No valid XML data to display when XML string is empty', () => {
        // Render the XMLDiagram with an empty XML string
        render(<XMLDiagram xmlString='' />);

        // Assert that the fallback message is displayed
        expect(
            screen.getByText('No valid XML data to display'),
        ).toBeInTheDocument();
    });

    it('should render No valid XML data to display when XML string is invalid', () => {
        // Mock the parseXML function to throw an error (simulating an invalid XML string)
        (parseXML as jest.Mock).mockImplementationOnce(() => {
            throw new Error('XML Parse Error'); // Simulating XML parse failure
        });

        // Render the XMLDiagram with an invalid XML string
        render(<XMLDiagram xmlString='<invalid>XML' />);

        // Assert that the fallback message is displayed due to the invalid XML
        expect(
            screen.getByText('No valid XML data to display'),
        ).toBeInTheDocument();
    });

    it('should render the XMLNode component when XML string is valid', () => {
        // Define a mock valid XML string
        const mockXMLString =
            '<xacml3:policy policyid="access-document" version="1">';

        // Mock parseXML to return a valid parsed object when a valid XML string is passed
        (parseXML as jest.Mock).mockImplementationOnce(() => ({
            policyId: 'access-document', // Return a mock parsed object
            version: '1.0',
        }));

        // Render the XMLDiagram with the valid XML string
        render(<XMLDiagram xmlString={mockXMLString} />);

        // Assert that the mocked XMLNode component is rendered
        expect(screen.getByText('Mocked XMLNode')).toBeInTheDocument();
    });
});
