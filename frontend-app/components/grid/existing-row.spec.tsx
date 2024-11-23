import { render } from "@testing-library/react";

import { GuessLetterResult } from "@/lib/types";
import { GuessColour } from "@/lib/enums";

import ExistingRow from "./existing-row";

describe('ExistingRow', () => {
    it('shows the correct tiles based on the letter result (grey, yellow or green)', () => {
        // Arrange
        const guess: GuessLetterResult[] = [
            { letter: 'a', colour: GuessColour.grey },
            { letter: 'b', colour: GuessColour.yellow },
            { letter: 'c', colour: GuessColour.green },
            { letter: 'd', colour: GuessColour.yellow },
            { letter: 'e', colour: GuessColour.grey },
        ];

        const { container } = render(<ExistingRow guess={guess} />);

        // Assert
        const tileEls = container.querySelectorAll('.tile');

        expect(tileEls.length).toBe(5);

        expect(tileEls[0]!.className).toContain('grey');
        expect(tileEls[1]!.className).toContain('yellow');
        expect(tileEls[2]!.className).toContain('green');
        expect(tileEls[3]!.className).toContain('yellow');
        expect(tileEls[4]!.className).toContain('grey');
    });
});