import clsx from "clsx";

import Tile from "./tile";

interface FilledTileProps {
    text?: string;
    color: 'grey' | 'green' | 'yellow'
}

export default function FilledTile({ color, text }: FilledTileProps) {
    const filledTileClasses = clsx(
        "border-0 bg-gradient-to-tr",
        color === 'grey' ? "from-neutral-400 to-neutral-800" : null,
        color === 'green' ? "from-green-400 to-green-800" : null,
        color === 'yellow' ? "from-yellow-400 to-yellow-800 " : null
    );

    return <Tile text={text} classes={filledTileClasses} />;
}
