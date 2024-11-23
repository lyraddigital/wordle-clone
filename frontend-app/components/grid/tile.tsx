import clsx from "clsx";
import { PropsWithChildren } from "react";

type TileProps = PropsWithChildren & {
    classes?: string;
}

export default function Tile({ children, classes }: TileProps) {
    const tileClasses = clsx(
        "tile basis-[62px] h-[62px] shrink-0 dark:text-white flex justify-center items-center text-3xl font-bold uppercase border-2",
        classes
    );

    return (
        <div className={tileClasses}>
            {children}
        </div>
    );
}
