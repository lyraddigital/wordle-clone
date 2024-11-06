
import { render } from '@testing-library/react';

import HelpIcon from './help-icon';

describe('HelpIcon Component', () => {
    it('shows help icon svg', () => {
        // Arrange / Action
        const { container } = render(<HelpIcon />);
        
        const svgElementIcon = container.querySelector('[data-icon]');        

        // Assert
        expect(svgElementIcon).toBeDefined();
        expect(svgElementIcon?.getAttribute('data-icon')).toBe("help");
    });
});