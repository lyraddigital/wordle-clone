import clsx from "clsx";

import Tile from "./tile";

interface UnfilledTileProps {
    text?: string;
}

export default function UnfilledTile({ text }: UnfilledTileProps) {
    const unfilledTileClasses = clsx(
        !!text ? "border-neutral-500" : null
    );

    return <Tile text={text} classes={unfilledTileClasses} />;
}
