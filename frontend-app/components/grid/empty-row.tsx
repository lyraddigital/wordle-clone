import RowContainer from "@/components/grid/row-container";
import Tile from "@/components/grid/tile";

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
