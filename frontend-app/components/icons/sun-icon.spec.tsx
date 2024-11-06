
import { render } from '@testing-library/react';

import SunIcon from './sun-icon';

describe('SunIcon Component', () => {
    it('shows sun icon svg', () => {
        // Arrange / Action
        const { container } = render(<SunIcon />);
        
        const svgElementIcon = container.querySelector('[data-icon]');        

        // Assert
        expect(svgElementIcon).toBeDefined();
        expect(svgElementIcon?.getAttribute('data-icon')).toBe("sun");
    });
});