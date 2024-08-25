import { Tile } from "../models/tile";

import FilledTile from "./filled-tile";
import UnfilledTile from "./unfilled-tile";

interface TileRowProps {
    tiles: Tile[];
}

export default function TileRow({ tiles }: TileRowProps) {
    return (
        <div className="flex gap-[5px] justify-center">
            {tiles.map((tile, tInd) => (
                tile.color ? <FilledTile key={tInd} text={tile.text} color={tile.color} /> : <UnfilledTile key={tInd} text={tile.text} />
            ))}
        </div>
    );
}
