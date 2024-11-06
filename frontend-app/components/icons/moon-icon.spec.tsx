
import { render } from '@testing-library/react';

import MoonIcon from './moon-icon';

describe('MoonIcon Component', () => {
    it('shows moon icon svg', () => {
        // Arrange / Action
        const { container } = render(<MoonIcon />);
        
        const svgElementIcon = container.querySelector('[data-icon]');        

        // Assert
        expect(svgElementIcon).toBeDefined();
        expect(svgElementIcon?.getAttribute('data-icon')).toBe("moon");
    });
});