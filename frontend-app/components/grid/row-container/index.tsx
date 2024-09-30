import clsx from "clsx";
import { PropsWithChildren } from "react";

interface RowContainerProps extends PropsWithChildren {
    classes?: string;
}

export default function RowContainer({ children, classes }: RowContainerProps) {
    const rowContainerClasses = clsx(
        "flex gap-[5px] justify-center",
        classes
    );

    return (
        <div className={rowContainerClasses}>
            {children}
        </div>
    );
}
