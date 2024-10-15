jest.mock('@/hooks/wordle/use-wordle');

import { render, screen } from '@testing-library/react';

import { WordleState } from '@/contexts/wordle-context';
import { GuessColour } from '@/lib/enums';
import useWordle from "@/hooks/wordle/use-wordle";

import KeyPadAlphaKey from './keypad-alpha-key';

describe('KeyPadAlphaKey', () => {
    it('loads the correct button with correct text', () => {
        // Arrange
        const letter = "a";

        (useWordle as jest.MockedFunction<typeof useWordle>).mockImplementation(() => ({
            usedKeys: {}
        }) as WordleState);

        // Action
        render(<KeyPadAlphaKey letter={letter} />);

        const button = screen.getByRole('button');
        const buttonText = button?.textContent;

        // Assert
        expect(button).toBeDefined();
        expect(buttonText).toBe(letter);
    });

    it('loads the correct button with correct class name if no colour is set for the letter', () => {
        // Arrange
        const letter = "a";

        (useWordle as jest.MockedFunction<typeof useWordle>).mockImplementation(() => ({
            usedKeys: {}
        }) as WordleState);

        // Action
        render(<KeyPadAlphaKey letter={letter} />);

        const button = screen.getByRole('button');
        const buttonClassName = button?.className;

        // Assert
        expect(button).toBeDefined();
        expect(buttonClassName).toBe("p-0 flex-1 dark:text-neutral-300 uppercase font-bold h-[58px] rounded-[4px] bg-neutral-300 dark:bg-neutral-500");
    });

    it('loads the correct button with correct class name if green colour is set for the letter', () => {
        // Arrange
        const letter: string = "a";

        (useWordle as jest.MockedFunction<typeof useWordle>).mockImplementation(() => ({
            usedKeys: { [letter]: GuessColour.green }
        }) as WordleState);

        // Action
        render(<KeyPadAlphaKey letter={letter} />);

        const button = screen.getByRole('button');
        const buttonClassName = button?.className;

        // Assert
        expect(button).toBeDefined();
        expect(buttonClassName).toBe("p-0 flex-1 dark:text-neutral-300 uppercase font-bold h-[58px] rounded-[4px] text-neutral-100 bg-green-600 text-neutral-100 dark:bg-green-700");
    });

    it('loads the correct button with correct class name if yellow colour is set for the letter', () => {
        // Arrange
        const letter: string = "a";

        (useWordle as jest.MockedFunction<typeof useWordle>).mockImplementation(() => ({
            usedKeys: { [letter]: "yellow" }
        }) as WordleState);

        // Action
        render(<KeyPadAlphaKey letter={letter} />);

        const button = screen.getByRole('button');
        const buttonClassName = button?.className;

        // Assert
        expect(button).toBeDefined();
        expect(buttonClassName).toBe("p-0 flex-1 dark:text-neutral-300 uppercase font-bold h-[58px] rounded-[4px] text-neutral-100 bg-yellow-500 dark:bg-yellow-600");
    });

    it('loads the correct button with correct class name if grey colour is set for the letter', () => {
        // Arrange
        const letter: string = "a";

        (useWordle as jest.MockedFunction<typeof useWordle>).mockImplementation(() => ({
            usedKeys: { [letter]: "grey" }
        }) as WordleState);

        // Action
        render(<KeyPadAlphaKey letter={letter} />);

        const button = screen.getByRole('button');
        const buttonClassName = button?.className;

        // Assert
        expect(button).toBeDefined();
        expect(buttonClassName).toBe("p-0 flex-1 dark:text-neutral-300 uppercase font-bold h-[58px] rounded-[4px] text-neutral-100 bg-neutral-500 dark:bg-neutral-700");
    });
});