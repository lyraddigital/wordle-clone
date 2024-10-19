import { render } from '@testing-library/react';

import KeyPadKeySpacer from './keypad-key-spacer';

describe('KeyPadKeySpacer', () => {
    it('loads the correct div with correct css class', () => {
        // Arrange / Action
        const { container } = render(<KeyPadKeySpacer />);
        const spacerDiv = container.children[0];

        // Assert
        expect(spacerDiv?.className).toBe("flex-[0.5]");
    });
});