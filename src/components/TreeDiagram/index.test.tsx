import { render, screen } from '@testing-library/react';

import TreeDiagram from '.';

describe('TreeDiagram', () => {
    test('renders XML content correctly', () => {
        const xmlData = '<note><to>Test</to></note>';

        render(<TreeDiagram xml={xmlData} />);

        // Check if the XMLViewer component renders the content
        expect(screen.getAllByText(/note/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/to/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Test/i).length).toBeGreaterThan(0);
    });

    test('does not render anything for empty XML', () => {
        render(<TreeDiagram xml='' />);

        // Check that no XML elements are rendered
        expect(screen.queryByText(/note/i)).not.toBeInTheDocument();
    });

    test('renders properly with malformed XML', () => {
        const malformedXmlData = '<note><to>Test</to>'; // Missing closing tag

        render(<TreeDiagram xml={malformedXmlData} />);

        // Check that the component still renders something
        expect(screen.getAllByText(/note/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/to/i).length).toBeGreaterThan(0);
        expect(screen.getAllByText(/Test/i).length).toBeGreaterThan(0);
    });
});
