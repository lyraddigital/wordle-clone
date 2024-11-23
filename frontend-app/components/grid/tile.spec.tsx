import { render } from "@testing-library/react";

import Tile from "./tile";

describe('Tile', () => {
    it('sets the correct class on the tile by default', () => {
        // Arrange / Action
        const { container } = render(<Tile />);

        // Assert
        const tileEl = container.querySelector('.tile');

        expect(tileEl!.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2');
    });

    it('sets the text correctly on the tile', () => {
        // Arrange / Action
        const childText = 'Child text';
        const { container } = render(<Tile>{childText}</Tile>);

        // Assert
        const tileEl = container.querySelector('.tile');

        expect(tileEl!.textContent).toBe(childText);
    });

    it('sets the correct classes on the tile when using custom classes', () => {
        // Arrange / Action
        const classes = 'test class';
        const { container } = render(<Tile classes={classes} />);

        // Assert
        const tileEl = container.querySelector('.tile');

        expect(tileEl!.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 test class');
    });
});