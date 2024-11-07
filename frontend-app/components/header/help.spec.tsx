import { PropsWithChildren, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ModalsContext, { ModalsState } from '@/contexts/modals-context';

import Help from './help';

const createWrapperComponent = (
    defaultShowHelpModal: boolean
): React.FC<PropsWithChildren> => {
    return function WrapperComponent({ children }: PropsWithChildren): React.ReactNode {
        const [showHelpModal, setShowHelpModal] = useState<boolean>(defaultShowHelpModal);

        const modalState = {
            showHelpModal,
            setShowHelpModal
        } as ModalsState;

        return (
            <ModalsContext.Provider value={modalState}>
                <div data-testid="test-container">
                    {children}
                </div>
                <div data-testid="show-help-modal">{showHelpModal.toString()}</div>
            </ModalsContext.Provider>
        )
    };
}

describe('Help Component', () => {
    it('show help modal flag is set when clicking on the help div', async () => {
        // Arrange
        const user = userEvent.setup();
        const wrapper = createWrapperComponent(
            false
        );        

        render(<Help />, { wrapper });

        const heading = screen.getByTestId('test-container');
        const helpRoot = heading.firstElementChild;

        // Action
        await user.click(helpRoot!);

        const showHelpModalEl = screen.getByTestId('show-help-modal');

        // Assert
        expect(showHelpModalEl.textContent).toBe(true.toString());
    });
});