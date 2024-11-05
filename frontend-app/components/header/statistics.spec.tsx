import { PropsWithChildren, useState } from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';

import ModalsContext, { ModalsState } from '@/contexts/modals-context';

import Statistics from './statistics';

const createWrapperComponent = (
    defaultShowStatisticsModal: boolean
): React.FC<PropsWithChildren> => {
    return function WrapperComponent({ children }: PropsWithChildren): React.ReactNode {
        const [showStatisticsModal, setShowStatisticsModal] = useState<boolean>(defaultShowStatisticsModal);

        const modalState = {
            showStatisticsModal,
            setShowStatisticsModal
        } as ModalsState;

        return (
            <ModalsContext.Provider value={modalState}>
                <div data-testid="test-container">
                    {children}
                </div>
                <div data-testid="show-statistics-modal">{showStatisticsModal.toString()}</div>
            </ModalsContext.Provider>
        )
    };
}

describe('Statistics Component', () => {
    it('show statics modal flag is set when clicking on the statistics div', async () => {
        // Arrange
        const wrapper = createWrapperComponent(
            false
        );

        render(<Statistics />, { wrapper });

        const heading = screen.getByTestId('test-container');
        const statisticsRoot = heading.firstElementChild;

        // Action
        await user.click(statisticsRoot!);

        const showStatisticsModalEl = screen.getByTestId('show-statistics-modal');

        // Assert
        expect(showStatisticsModalEl.textContent).toBe(true.toString());
    });
});