import { render, screen } from '@testing-library/react';

import KeyPadRow from './keypad-row';

describe('KeyPadRow', () => {
    it('loads the correct div with correct css', () => {
        // Arrange / Action
        const { container } = render(<KeyPadRow />);
        const rowDiv = container.children[0];

        // Assert
        expect(rowDiv.className).toBe("flex mx-3 gap-[2px] sm:gap-[6px]");
    });

    it('children is inside the div', () => {
        // Arrange / Action
        render(
            <KeyPadRow>
                <button>Save</button>
            </KeyPadRow>
        );
        const button = screen.getByRole('button', { name: /Save/i });

        // Assert
        expect(button).toBeDefined();
    });
});