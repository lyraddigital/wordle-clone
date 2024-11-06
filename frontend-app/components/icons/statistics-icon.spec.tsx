
import { render } from '@testing-library/react';

import StatisticsIcon from './statistics-icon';

describe('StatisticsIcon Component', () => {
    it('shows statistics icon svg', () => {
        // Arrange / Action
        const { container } = render(<StatisticsIcon />);
        
        const svgElementIcon = container.querySelector('[data-icon]');        

        // Assert
        expect(svgElementIcon).toBeDefined();
        expect(svgElementIcon?.getAttribute('data-icon')).toBe("statistics");
    });
});