import clsx from "clsx";
import { PropsWithChildren } from "react";

type RowContainerProps = PropsWithChildren & {
    classes?: string;
}

export default function RowContainer({ children, classes }: RowContainerProps) {
    const rowContainerClasses = clsx(
        "row-container flex gap-[5px] justify-center",
        classes
    );

    return (
        <div className={rowContainerClasses}>
            {children}
        </div>
    );
}
