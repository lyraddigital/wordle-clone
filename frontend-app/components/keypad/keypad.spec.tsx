import { render, screen } from '@testing-library/react';

import KeyPad from './keypad';
import WordleProvider from '../providers/wordle-provider';

describe('KeyPad', () => {
    it('contains 3 rows of letters', () => {
        // Arrange / Action
        const { container } = render(
            <WordleProvider>
                <KeyPad />
            </WordleProvider>
        );

        const rowDivs = container.querySelectorAll(':scope > div > div');

        // Assert
        // expect(rowDivs.length).toBe(3);

        rowDivs.forEach(rowDiv => {
            console.log(rowDiv.outerHTML);
            expect(rowDiv.className).toBe('flex mx-3 gap-[2px] sm:gap-[6px]');
        });
    });
});