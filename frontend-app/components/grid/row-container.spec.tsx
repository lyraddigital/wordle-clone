import { render } from "@testing-library/react";

import RowContainer from "./row-container";

describe('RowContainer', () => {
    it('sets the correct class on the row container', () => {
        // Arrange / Action
        const children = "Children text";
        const { container } = render(<RowContainer>{children}</RowContainer>);

        // Assert
        const rowContainerEl = container.querySelector('.row-container');

        expect(rowContainerEl).not.toBeNull();
        expect(rowContainerEl?.className).toBe('row-container flex gap-[5px] justify-center');
    });

    it('sets the children inside of the row container', () => {
        // Arrange / Action
        const children = "Children text";
        const { container } = render(<RowContainer>{children}</RowContainer>);

        // Assert
        const rowContainerEl = container.querySelector('.row-container');

        expect(rowContainerEl).not.toBeNull();
        expect(rowContainerEl?.textContent).toBe(children);
    });

    it('sets the custom classes to the row container classes when custom classes a passed to the row container', () => {
        // Arrange / Action        
        const { container } = render(<RowContainer classes="test class" />);

        // Assert
        const rowContainerEl = container.querySelector('.row-container');

        expect(rowContainerEl).not.toBeNull();
        expect(rowContainerEl?.className).toBe('row-container flex gap-[5px] justify-center test class');
    });
});