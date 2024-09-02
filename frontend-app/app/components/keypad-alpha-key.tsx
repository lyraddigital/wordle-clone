import clsx from "clsx";

import useUsedKeys from "../hooks/use-used-keys";

import KeyPadKey from "./keypad-key";

interface KeyPadAlphaKeyProps {
    letter: string;
}

export default function KeyPadAlphaKey({ letter }: KeyPadAlphaKeyProps) {
    const usedKeys = useUsedKeys();
    const colour = usedKeys[letter];
    const keyClasses = clsx(
        colour == "yellow" ? "bg-yellow-600" : undefined,
        colour === "green" ? "bg-green-700" : undefined,
        colour === "grey" ? "bg-neutral-700" : undefined,
        !colour && "bg-neutral-500"
    );

    return (
        <KeyPadKey value={letter} classes={keyClasses}>
            {letter}
        </KeyPadKey>
    );
}