import RowContainer from "@/components/grid/row-container";
import Tile from "@/components/grid/tile";

export default function EmptyRow() {
    const emptyTiles = ([...new Array(5)]).map((_, i) => (
        <Tile key={i} classes="border-neutral-300 dark:border-neutral-700" />
    ));

    return (
        <RowContainer>{emptyTiles}</RowContainer>
    );
}
