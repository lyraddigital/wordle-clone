import { PropsWithChildren, useEffect, useState } from "react";

import ModalsContext, { ModalsState } from "../../context/modals-context";
import useWordle from "../../hooks/use-wordle";

export default function ModalsProvider({ children }: PropsWithChildren) {
    const { isGameOver } = useWordle();
    const [showStatisticsModal, setShowStatisticsModal] = useState<boolean>(false);
    const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            if (isGameOver) {
                setShowStatisticsModal(true);
            }
        }, 1250);
    }, [isGameOver, setShowStatisticsModal]);

    const modalState: ModalsState = {
        showHelpModal,
        showStatisticsModal,
        setShowHelpModal,
        setShowStatisticsModal
    };

    return (
        <ModalsContext.Provider value={modalState}>
            {children}
        </ModalsContext.Provider>
    );
}