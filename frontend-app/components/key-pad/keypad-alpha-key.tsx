import clsx from "clsx";

import KeyPadKey from "@/components/key-pad/keypad-key";
import useWordle from "@/hooks/wordle/use-wordle";

type KeyPadAlphaKeyProps = {
    letter: string;
}

export default function KeyPadAlphaKey({ letter }: KeyPadAlphaKeyProps) {
    const { usedKeys } = useWordle();
    const colour = usedKeys[letter];
    const keyClasses = clsx(
        colour == "yellow" ? "text-neutral-100 bg-yellow-500 dark:bg-yellow-600" : undefined,
        colour === "green" ? "text-neutral-100 bg-green-600 text-neutral-100 dark:bg-green-700" : undefined,
        colour === "grey" ? "text-neutral-100 bg-neutral-500 dark:bg-neutral-700" : undefined,
        !colour && "bg-neutral-300 dark:bg-neutral-500"
    );

    return (
        <KeyPadKey value={letter} classes={keyClasses}>
            {letter}
        </KeyPadKey>
    );
}