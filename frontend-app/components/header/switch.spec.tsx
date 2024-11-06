import { PropsWithChildren, useState } from 'react';
import { render } from '@testing-library/react';

import ThemeContext, { ThemeState } from '@/contexts/theme-context';

import Switch from './switch';
import userEvent from '@testing-library/user-event';

const createWrapperComponent = (
    defaultIsDarkMode: boolean
): React.FC<PropsWithChildren> => {
    return function WrapperComponent({ children }: PropsWithChildren): React.ReactNode {
        const [isDarkMode, setIsDarkMode] = useState<boolean>(defaultIsDarkMode);

        const themeState = {
            isDarkMode,
            setIsDarkMode
        } as ThemeState;

        return (
            <ThemeContext.Provider value={themeState}>
                {children}
            </ThemeContext.Provider>
        )
    };
}

describe('Switch Component', () => {
    it('dark mode is false by default, shows moon icon', () => {
        // Arrange
        const wrapper = createWrapperComponent(
            false
        );

        // Action
        const { container } = render(<Switch />, { wrapper });

        // Assert
        const svgElementIcon = container.querySelector('[data-icon]');        

        // Assert
        expect(svgElementIcon).toBeDefined();
        expect(svgElementIcon?.getAttribute('data-icon')).toBe("moon");
    });

    it('dark mode is true by default, shows sun icon', () => {
        // Arrange
        const wrapper = createWrapperComponent(
            true
        );

        // Action
        const { container } = render(<Switch />, { wrapper });

        // Assert
        const svgElementIcon = container.querySelector('[data-icon]');        

        // Assert
        expect(svgElementIcon).toBeDefined();
        expect(svgElementIcon?.getAttribute('data-icon')).toBe("sun");
    });

    it('dark mode is false by default, and switch is clicked, shows sun icon', async () => {
        // Arrange
        const wrapper = createWrapperComponent(
            false
        );

        const { container } = render(<Switch />, { wrapper });
        const rootElement = container.firstElementChild!;

        // Action
        await userEvent.click(rootElement);

        // Assert
        const svgElementIcon = container.querySelector('[data-icon]');        

        // Assert
        expect(svgElementIcon).toBeDefined();
        expect(svgElementIcon?.getAttribute('data-icon')).toBe("sun");
    });

    it('dark mode is true by default, and switch is clicked, shows moon icon', async () => {
        // Arrange
        const wrapper = createWrapperComponent(
            true
        );

        const { container } = render(<Switch />, { wrapper });
        const rootElement = container.firstElementChild!;

        // Action
        await userEvent.click(rootElement);

        // Assert
        const svgElementIcon = container.querySelector('[data-icon]');        

        // Assert
        expect(svgElementIcon).toBeDefined();
        expect(svgElementIcon?.getAttribute('data-icon')).toBe("moon");
    });
});