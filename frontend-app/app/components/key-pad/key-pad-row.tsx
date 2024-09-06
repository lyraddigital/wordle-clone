import { PropsWithChildren } from "react";

export default function KeyPadRow({ children }: PropsWithChildren) {
    return (
        <div className="flex mx-3 gap-[2px] sm:gap-[6px]">
            {children}
        </div>
    );
}