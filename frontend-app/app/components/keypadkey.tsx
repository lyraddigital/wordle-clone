import clsx from "clsx";

import useUsedKeys from "../hooks/use-used-keys";

interface KeyPadKeyProps {
    letter: string;
}

export default function KeyPadKey({ letter }: KeyPadKeyProps) {
    const usedKeys = useUsedKeys();
    const colour = usedKeys[letter];
    const keyClasses = clsx(
        "p-0 flex-1 text-neutral-300 uppercase font-bold h-[58px] rounded-[4px]",
        colour == "yellow" ? "bg-yellow-500" : undefined,
        colour === "green" ? "bg-green-700" : undefined,
        colour === "grey" ? "bg-neutral-600" : undefined,
        !colour && "bg-neutral-400"
    );

    return (
        <button key={letter} className={keyClasses}>
            {letter}
        </button>
    );
}