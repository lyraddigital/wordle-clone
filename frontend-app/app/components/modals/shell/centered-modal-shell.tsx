import { PropsWithChildren, ReactElement } from "react";

import ModalOverlay from './modal-overlay';

interface ModalOverlayProps extends PropsWithChildren {
    footerContent?: ReactElement;
    onClose?: () => void;
    showModal: boolean;
    showCloseBox?: boolean;
    title?: string;
}

export default function CenteredModalShell({ children, footerContent, onClose, showCloseBox, showModal, title }: ModalOverlayProps) {
    return (
        showModal && (
            <ModalOverlay showModal={showModal}>
                <div className="w-[90%] max-w-[470px] p-[8px] pt-[20px] pb-[40px] border-1 bg-white dark:bg-neutral-800 dark:text-white border-neutral-500 rounded-[16px] shadow-inner">
                    {showCloseBox && <div className="flex justify-end">
                        <span className="mr-2 cursor-pointer" onClick={onClose}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="stroke-neutral-800 fill-neutral-800 dark:stroke-neutral-300 dark:fill-neutral-300">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                            </svg>
                        </span>
                    </div>}
                    {title && <h2 className="text-center uppercase font-bold">{title}</h2>}
                    {children}
                    {footerContent}
                </div>
            </ModalOverlay>
        )
    );
}