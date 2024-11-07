jest.mock('@/hooks/keyboard/use-keypad-press');

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import useKeypadPress from "@/hooks/keyboard/use-keypad-press";

import KeyPadKey from './keypad-key';

describe('KeyPadKey', () => {
    it('loads the correct button with correct classes and children', () => {
        // Arrange
        const value = "a";
        const initialButtonContent = (
            <span>{value}</span>
        );
        const classes = "someClass";

        // Action
        render((
            <KeyPadKey classes={classes} value={value}>
                {initialButtonContent}
            </KeyPadKey>
        ));

        const button = screen.getByRole('button');
        const buttonContent = button?.querySelector('span');
        const buttonClassName = button?.className;
        const buttonText = buttonContent?.textContent;

        // Assert
        expect(button).toBeDefined();
        expect(buttonContent).toBeDefined();
        expect(buttonClassName).toBeDefined();
        expect(buttonText).toBeDefined();
        expect(buttonClassName).toBe(`p-0 flex-1 dark:text-neutral-300 uppercase font-bold h-[58px] rounded-[4px] ${classes}`);
        expect(buttonText).toBe(value);
    });

    it('calls click event handler with value when keypad key is pressed', async () => {
        // Arrange
        const user = userEvent.setup();
        const value = "a";
        const initialButtonContent = (
            <span>{value}</span>
        );
        const classes = "someClass";
        const clickHandler = jest.fn();

        (useKeypadPress as jest.MockedFunction<typeof useKeypadPress>).mockImplementationOnce(() => clickHandler);

        // Action
        render((
            <KeyPadKey classes={classes} value={value}>
                {initialButtonContent}
            </KeyPadKey>
        ));

        const button = screen.getByRole('button');
        await user.click(button);

        // Assert        
        expect(clickHandler).toHaveBeenCalledWith(value);
    });
});