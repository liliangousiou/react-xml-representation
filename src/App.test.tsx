import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import App from './App';

describe('App', () => {
    it('should render Title component', () => {
        render(<App />);

        // Check if the Title component is rendered
        expect(screen.getByText('XML Representation')).toBeInTheDocument();
    });

    it('should render UploadForm component', () => {
        render(<App />);

        // Ensure the UploadForm component is rendered
        expect(screen.getByTestId('upload-form')).toBeInTheDocument();
    });

    it('should render both Title and UploadForm components together', () => {
        render(<App />);

        // Ensure both components are rendered
        expect(screen.getByText('XML Representation')).toBeInTheDocument();
        expect(screen.getByTestId('upload-form')).toBeInTheDocument();
    });
});
