import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';

import App from './App';

test('renders title', () => {
    render(<App />);
    const titleElement = screen.getByText(/XML Uploader/i);
    expect(titleElement).toBeInTheDocument();
});
