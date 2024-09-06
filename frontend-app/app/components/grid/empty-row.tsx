import RowContainer from "./row-container";
import Tile from "./tile";

export default function EmptyRow() {
    return (
        <RowContainer>
            <Tile classes="border-neutral-300 dark:border-neutral-700" />
            <Tile classes="border-neutral-300 dark:border-neutral-700" />
            <Tile classes="border-neutral-300 dark:border-neutral-700" />
            <Tile classes="border-neutral-300 dark:border-neutral-700" />
            <Tile classes="border-neutral-300 dark:border-neutral-700" />
        </RowContainer>
    );
}
