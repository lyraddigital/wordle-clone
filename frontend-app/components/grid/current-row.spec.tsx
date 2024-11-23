import { PropsWithChildren } from "react";
import { render } from "@testing-library/react";

import WordleContext, { WordleState } from "@/contexts/wordle-context";

import CurrentRow from "./current-row";

const createWrapperComponent = (
    currentGuess: string,
    isCurrentGuessIncorrect: boolean
): React.FC<PropsWithChildren> => {
    return function WrapperComponent({ children }: PropsWithChildren): React.ReactNode {
        const wordleState = {
            currentGuess,
            isCurrentGuessIncorrect
        } as WordleState;

        return (
            <WordleContext.Provider value={wordleState}>
                {children}
            </WordleContext.Provider>
        )
    };
}

describe('CurrentRow', () => {
    it('sets the correct class on the row container', () => {
        // Arrange
        const currentGuess = '';
        const isCurrentGuessIncorrect = false;
        const wrapper = createWrapperComponent(currentGuess, isCurrentGuessIncorrect);

        // Action
        const { container } = render(<CurrentRow />, { wrapper });

        // Assert
        const rowContainerEl = container.querySelector('.current');

        expect(rowContainerEl).not.toBeNull();
    });

    it('shows the correct tiles when no letters of a guess is made', () => {
        // Arrange
        const currentGuess = '';
        const isCurrentGuessIncorrect = false;
        const wrapper = createWrapperComponent(currentGuess, isCurrentGuessIncorrect);

        // Action
        const { container } = render(<CurrentRow />, { wrapper });

        // Assert
        const tileEls = container.querySelectorAll('.current > .border-neutral-300');

        expect(tileEls.length).toBe(5);

        tileEls.forEach(tileEl => {
            expect(tileEl.textContent).toBe('');
            expect(tileEl.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 border-neutral-300 dark:border-neutral-700')
        });
    });

    it('shows the correct tiles when a letter of a guess is made', () => {
        // Arrange
        const currentGuess = 'ab';
        const isCurrentGuessIncorrect = false;
        const wrapper = createWrapperComponent(currentGuess, isCurrentGuessIncorrect);

        // Action
        const { container } = render(<CurrentRow />, { wrapper });

        // Assert
        const unfilledTileEls = container.querySelectorAll('.current > .border-neutral-300');
        const filledTileEls = container.querySelectorAll('.current > :not(.border-neutral-300)');

        expect(unfilledTileEls.length).toBe(3);
        expect(filledTileEls.length).toBe(2);

        unfilledTileEls.forEach(unfilledTileEl => {
            expect(unfilledTileEl.textContent).toBe('');
            expect(unfilledTileEl.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 border-neutral-300 dark:border-neutral-700')
        });

        expect(filledTileEls[0]?.textContent).toBe('a');
        expect(filledTileEls[0]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2');
        expect(filledTileEls[1]?.textContent).toBe('b');
        expect(filledTileEls[1]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2');
    });

    it('shows the correct tiles when all letters of a guess is made', () => {
        // Arrange
        const currentGuess = 'abcde';
        const isCurrentGuessIncorrect = false;
        const wrapper = createWrapperComponent(currentGuess, isCurrentGuessIncorrect);

        // Action
        const { container } = render(<CurrentRow />, { wrapper });

        // Assert
        const unfilledTileEls = container.querySelectorAll('.current > .border-neutral-300');
        const filledTileEls = container.querySelectorAll('.current > :not(.border-neutral-300)');

        expect(unfilledTileEls.length).toBe(0);
        expect(filledTileEls.length).toBe(5);

        expect(filledTileEls[0]?.textContent).toBe('a');
        expect(filledTileEls[0]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2');
        expect(filledTileEls[1]?.textContent).toBe('b');
        expect(filledTileEls[1]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2');
        expect(filledTileEls[2]?.textContent).toBe('c');
        expect(filledTileEls[2]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2');
        expect(filledTileEls[3]?.textContent).toBe('d');
        expect(filledTileEls[3]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2');
        expect(filledTileEls[4]?.textContent).toBe('e');
        expect(filledTileEls[4]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2');
    });

    it('shows the correct tiles when a letter of a guess is made, but the guess was flagged as incorrect', () => {
        // Arrange
        const currentGuess = 'ab';
        const isCurrentGuessIncorrect = true;
        const wrapper = createWrapperComponent(currentGuess, isCurrentGuessIncorrect);

        // Action
        const { container } = render(<CurrentRow />, { wrapper });

        // Assert
        const unfilledTileEls = container.querySelectorAll('.current > .border-neutral-300');
        const filledTileEls = container.querySelectorAll('.current > :not(.border-neutral-300)');

        expect(unfilledTileEls.length).toBe(3);
        expect(filledTileEls.length).toBe(2);

        unfilledTileEls.forEach(unfilledTileEl => {
            expect(unfilledTileEl.textContent).toBe('');
            expect(unfilledTileEl.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 border-neutral-300 dark:border-neutral-700 incorrect')
        });

        expect(filledTileEls[0]?.textContent).toBe('a');
        expect(filledTileEls[0]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 incorrect');
        expect(filledTileEls[1]?.textContent).toBe('b');
        expect(filledTileEls[1]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 incorrect');
    });

    it('shows the correct tiles when all letters of a guess is made', () => {
        // Arrange
        const currentGuess = 'abcde';
        const isCurrentGuessIncorrect = true;
        const wrapper = createWrapperComponent(currentGuess, isCurrentGuessIncorrect);

        // Action
        const { container } = render(<CurrentRow />, { wrapper });

        // Assert
        const unfilledTileEls = container.querySelectorAll('.current > .border-neutral-300');
        const filledTileEls = container.querySelectorAll('.current > :not(.border-neutral-300)');

        expect(unfilledTileEls.length).toBe(0);
        expect(filledTileEls.length).toBe(5);

        expect(filledTileEls[0]?.textContent).toBe('a');
        expect(filledTileEls[0]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 incorrect');
        expect(filledTileEls[1]?.textContent).toBe('b');
        expect(filledTileEls[1]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 incorrect');
        expect(filledTileEls[2]?.textContent).toBe('c');
        expect(filledTileEls[2]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 incorrect');
        expect(filledTileEls[3]?.textContent).toBe('d');
        expect(filledTileEls[3]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 incorrect');
        expect(filledTileEls[4]?.textContent).toBe('e');
        expect(filledTileEls[4]?.className).toBe('tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2 incorrect');
    });
});