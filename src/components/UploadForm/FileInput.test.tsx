import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import FileInput from './FileInput';

describe('FileInput', () => {
    it('should render correctly with a label and file input field', () => {
        render(<FileInput onFileSelect={vi.fn()} />);

        // Ensure the "Select an XML File" label is rendered
        expect(screen.getByText('Select an XML File')).toBeInTheDocument();

        // Ensure the hidden file input is rendered
        expect(screen.getByTestId('file-input')).toBeInTheDocument();
    });

    it('should show no error message by default', () => {
        render(<FileInput onFileSelect={vi.fn()} />);

        // Ensure no error message is shown by default
        const errorMessage = screen.queryByText(/error/i);
        expect(errorMessage).not.toBeInTheDocument();
    });

    it('should update the file name when a valid XML file is selected', async () => {
        const mockFileContent = '<xml><tag>content</tag></xml>';
        const file = new File([mockFileContent], 'valid.xml', {
            type: 'text/xml',
        });
        const mockOnFileSelect = vi.fn();

        render(<FileInput onFileSelect={mockOnFileSelect} />);

        // Mock the file input change
        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [file] },
        });

        // Wait for the file to be processed
        await waitFor(() =>
            expect(mockOnFileSelect).toHaveBeenCalledWith(mockFileContent),
        );

        // Check that the file name is displayed
        expect(screen.getByText('valid.xml')).toBeInTheDocument();
        expect(mockOnFileSelect).toHaveBeenCalledWith(mockFileContent);
    });

    it('should display an error message when a non-XML file is selected', async () => {
        const file = new File(['non-xml content'], 'invalid.txt', {
            type: 'text/plain',
        });
        const mockOnFileSelect = vi.fn();

        render(<FileInput onFileSelect={mockOnFileSelect} />);

        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [file] },
        });

        // Wait for error message to appear
        await waitFor(() =>
            expect(
                screen.getByText('Please select a valid XML file'),
            ).toBeInTheDocument(),
        );

        // Ensure null is passed to the parent component
        expect(mockOnFileSelect).toHaveBeenCalledWith(null);
    });

    it('should display an error message when there is a file read error', async () => {
        const file = new File(['<xml><tag>content</tag></xml>'], 'valid.xml', {
            type: 'text/xml',
        });
        const mockOnFileSelect = vi.fn();

        render(<FileInput onFileSelect={mockOnFileSelect} />);

        // Mock FileReader to trigger an error
        const reader = new FileReader();

        // Create a mock ProgressEvent for onerror, with the correct target type
        const progressEvent = new ProgressEvent('error', {
            bubbles: false,
            cancelable: true,
            composed: false,
        });

        // We cast the ProgressEvent to the correct type here
        const typedEvent = progressEvent as ProgressEvent<FileReader>;

        // Mock the readAsText function to simulate an error
        vi.spyOn(reader, 'readAsText').mockImplementationOnce(() => {
            // Simulate a read error by calling onerror with the casted ProgressEvent
            if (reader.onerror) reader.onerror(typedEvent);
        });

        // Spy on the 'FileReader' prototype and mock it to use our custom reader
        vi.spyOn(window, 'FileReader').mockImplementation(() => reader);

        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [file] },
        });

        // Ensure the error message appears after the file read error
        await waitFor(() =>
            expect(screen.getByText('Error reading file')).toBeInTheDocument(),
        );

        // Ensure null is passed to the parent component
        expect(mockOnFileSelect).toHaveBeenCalledWith(null);
    });

    it('should display "No file selected" and reset error message if the file input is cleared', async () => {
        const file = new File(['<xml><tag>content</tag></xml>'], 'valid.xml', {
            type: 'text/xml',
        });
        const mockOnFileSelect = vi.fn();

        render(<FileInput onFileSelect={mockOnFileSelect} />);

        // Simulate selecting a valid XML file
        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [file] },
        });

        // Wait for the file name to appear
        await waitFor(() =>
            expect(screen.getByText('valid.xml')).toBeInTheDocument(),
        );

        // Simulate clearing the file input (no file selected)
        fireEvent.change(screen.getByTestId('file-input'), {
            target: { files: [] },
        });

        // Ensure that "No file selected" is displayed
        await waitFor(() =>
            expect(screen.getByText('No file selected')).toBeInTheDocument(),
        );

        // Ensure that the error message is not displayed
        expect(
            screen.queryByText('Please select a valid XML file'),
        ).not.toBeInTheDocument();

        // Ensure that null is passed when file is cleared
        expect(mockOnFileSelect).toHaveBeenCalledWith(null);
    });
});
