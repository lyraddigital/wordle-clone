import clsx from "clsx";
import { PropsWithChildren } from "react";

import { useKeypadPress } from "../hooks/use-keypad-press";

interface KeyPadKeyProps extends PropsWithChildren {
    value: string;
    classes?: string;
}

export default function KeyPadKey({ children, classes, value }: KeyPadKeyProps) {
    const handleKeypadPressed = useKeypadPress();
    const keyClasses = clsx(
        "p-0 flex-1 dark:text-neutral-300 uppercase font-bold h-[58px] rounded-[4px]",
        classes
    );

    return (
        <button className={keyClasses} onClick={() => handleKeypadPressed(value)}>
            {children}
        </button>
    );
}