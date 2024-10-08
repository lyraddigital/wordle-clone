import { PropsWithChildren } from "react";

type ModalOverlayProps = PropsWithChildren & {
    showModal: boolean;
}

export default function ModalOverlay({ children, showModal }: ModalOverlayProps) {
    return (
        showModal && (
            <div className="flex justify-center items-center fixed w-full h-full bg-neutral-800/50 dark:bg-neutral-600/50">
                {children}
            </div>
        )
    );
}