import { fireEvent, render, screen, act } from '@testing-library/react';
import { vi } from 'vitest';

import UploadForm from '.';

describe('UploadForm', () => {
    beforeEach(() => {
        render(<UploadForm />);
    });

    test('renders the upload form', () => {
        const uploadInput = screen.getByLabelText(/upload file/i);
        expect(uploadInput).toBeInTheDocument();
    });

    test('displays error message for non-XML files', async () => {
        const uploadInput = screen.getByLabelText(/upload file/i);

        // Simulate file upload
        const file = new File(['dummy content'], 'test.txt', {
            type: 'text/plain',
        });

        await act(async () => {
            fireEvent.change(uploadInput, { target: { files: [file] } });
        });

        const errorMessage = await screen.findByText(
            /please select a valid xml file/i,
        );
        expect(errorMessage).toBeInTheDocument();
    });

    test('displays TreeDiagram with parsed XML data for valid XML files', async () => {
        const uploadInput = screen.getByLabelText(/upload file/i);

        // Simulate valid XML file upload
        const xmlFile = new File(['<note><to>Test</to></note>'], 'test.xml', {
            type: 'text/xml',
        });

        await act(async () => {
            fireEvent.change(uploadInput, { target: { files: [xmlFile] } });
        });

        // Wait for the TreeDiagram to render
        const noteElements = await screen.findAllByText(/note/i);
        const toElements = await screen.findAllByText(/to/i);
        const nameElements = await screen.findAllByText(/Test/i);

        // Check if the TreeDiagram renders with the expected XML content
        expect(noteElements.length).toBeGreaterThan(0);
        expect(toElements.length).toBeGreaterThan(0);
        expect(nameElements.length).toBeGreaterThan(0);
    });

    test('displays error message on file read error', async () => {
        const uploadInput = screen.getByLabelText(/upload file/i);

        // Create a new FileReader to simulate the error
        const readerMock = {
            readAsText: vi.fn(),
            onload: null,
            onerror: null,
        };

        // Replace the global FileReader with the mock
        vi.spyOn(window, 'FileReader').mockImplementation(
            () => readerMock as unknown as FileReader,
        );

        // Simulate file upload
        const file = new File(['<note><to>Test</to></note>'], 'test.xml', {
            type: 'text/xml',
        });

        await act(async () => {
            fireEvent.change(uploadInput, { target: { files: [file] } });

            // Simulate the error
            const errorEvent = new ProgressEvent('error');
            readerMock.onerror?.(errorEvent);
        });

        // Check if the error message is displayed
        const errorMessage = await screen.findByText(/error reading file/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
