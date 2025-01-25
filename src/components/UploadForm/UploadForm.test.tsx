import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import XMLDiagram from 'components/XMLDiagram';

import UploadForm from '.';

// Mock the XMLDiagram and FileInput components
vi.mock('components/XMLDiagram', () => ({
    __esModule: true,
    default: vi.fn(() => <div>XML Diagram</div>),
}));

vi.mock('./FileInput', () => ({
    __esModule: true,
    default: vi.fn(({ onFileSelect }: any) => {
        // Simulate file selection by calling the passed callback
        return (
            <button
                onClick={() => onFileSelect('<xml><tag>content</tag></xml>')}
            >
                Select File
            </button>
        );
    }),
}));

describe('UploadForm', () => {
    it('should render FileInput when no XML content is selected', () => {
        render(<UploadForm />);
        // Ensure FileInput component is rendered initially
        expect(screen.getByText('Select File')).toBeInTheDocument();
    });

    it('should render XMLDiagram when XML content is selected', () => {
        render(<UploadForm />);

        // Simulate file selection by clicking the Select File button
        fireEvent.click(screen.getByText('Select File'));

        // After file selection, check if XMLDiagram is rendered
        expect(screen.getByText('XML Diagram')).toBeInTheDocument();
    });

    it('should pass the correct XML content to XMLDiagram', () => {
        render(<UploadForm />);

        // Simulate file selection
        fireEvent.click(screen.getByText('Select File'));

        // Check that XMLDiagram has received the correct XML content as a prop
        expect(XMLDiagram).toHaveBeenCalledWith(
            { xmlString: '<xml><tag>content</tag></xml>' },
            expect.anything(),
        );
    });

    it('should not render XMLDiagram when no XML content is selected', () => {
        render(<UploadForm />);
        // Make sure the XMLDiagram is not rendered initially
        expect(screen.queryByText('XML Diagram')).toBeNull();
    });
});
