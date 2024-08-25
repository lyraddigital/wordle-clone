'use client';

import { useState } from "react";

import gameBoardRows from "../data/default-board";
import TileRow from "./tile-row";

export default function GameBoard() {
    const [board, setBoard] = useState(gameBoardRows);

    return (
        <div className="w-[350px] flex flex-col gap-[5px]">
            {board.map((gbr, gbri) => <TileRow key={gbri} tiles={gbr} />)}
        </div>
    );
}
