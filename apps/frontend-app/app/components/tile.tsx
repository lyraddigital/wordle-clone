import clsx from "clsx";

interface TileProps {
    text?: string;
    classes?: string;
}

export default function Tile({ classes, text }: TileProps) {
    const tileClasses = clsx(
        "basis-[62px] h-[62px] shrink-0 border border-neutral-600 border-2 text-white flex justify-center items-center text-3xl font-bold",
        classes
    );

    return <div className={tileClasses}>{text}</div>;
}
