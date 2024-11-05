import { render, screen } from '@testing-library/react';

import Header from './header';

describe('Header Component', () => {
    it('shows the correct text in h1', () => {
        // Arrange / Action        
        render(<Header />);

        const heading = screen.getByRole('heading');

        // Assert
        expect(heading.textContent).toBe('Wordle');
    });
});