import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import App from './App';

test('renders title', () => {
    render(<App />);

    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent('XML Uploader');

    // Check if the H1 renders the title
    expect(headingElement).toBeInTheDocument();
});
