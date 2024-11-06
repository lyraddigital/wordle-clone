
import { render } from '@testing-library/react';

import LockIcon from './lock-icon';

describe('LockIcon Component', () => {
    it('shows lock icon svg', () => {
        // Arrange / Action
        const { container } = render(<LockIcon />);
        
        const svgElementIcon = container.querySelector('[data-icon]');        

        // Assert
        expect(svgElementIcon).toBeDefined();
        expect(svgElementIcon?.getAttribute('data-icon')).toBe("lock");
    });
});