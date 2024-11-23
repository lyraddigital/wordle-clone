import { render } from "@testing-library/react";

import EmptyRow from "./empty-row";

describe('EmptyRow', () => {
    it('shows the correct tiles', () => {
        // Arrange / Action
        const { container } = render(<EmptyRow />);

        // Assert
        const tileEls = container.querySelectorAll('.tile');

        expect(tileEls.length).toBe(5);

        tileEls.forEach(tileEl => {
            expect(tileEl.textContent).toBe('');
            expect(tileEl.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 border-neutral-300 dark:border-neutral-700')
        });
    });
});