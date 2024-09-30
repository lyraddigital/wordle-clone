import { createContext, Dispatch, SetStateAction } from "react";

export interface ModalsState {
    showStatisticsModal: boolean;
    showHelpModal: boolean;
    setShowStatisticsModal: Dispatch<SetStateAction<boolean>>;
    setShowHelpModal: Dispatch<SetStateAction<boolean>>;
}

const ModalsContext = createContext<ModalsState>({} as ModalsState);

export default ModalsContext;