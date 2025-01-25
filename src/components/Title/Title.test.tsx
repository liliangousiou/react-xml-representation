import { render, screen } from '@testing-library/react';

import Title from '.';

describe('Title Component', () => {
    it('renders the h1 element', () => {
        render(<Title />); // Render the Title component

        // Check if the h1 element is in the document
        const titleElement = screen.getByRole('heading', { level: 1 });
        expect(titleElement).toBeInTheDocument();
    });

    it('displays the correct text', () => {
        render(<Title />);

        // Check if the text content inside the h1 is correct
        const titleElement = screen.getByRole('heading', { level: 1 });
        expect(titleElement).toHaveTextContent('XML Representation');
    });

    it('has the correct class names', () => {
        render(<Title />);

        // Check if the h1 has the correct classes
        const titleElement = screen.getByRole('heading', { level: 1 });
        expect(titleElement).toHaveClass('text-2xl');
        expect(titleElement).toHaveClass('font-bold');
        expect(titleElement).toHaveClass('text-center');
        expect(titleElement).toHaveClass('mt-6');
        expect(titleElement).toHaveClass('mb-8');
    });
});
