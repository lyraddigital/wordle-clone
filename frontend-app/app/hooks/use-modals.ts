import { useContext } from "react";

import ModalsContext, { ModalsState } from "../context/modals-context";

const useModals = (): ModalsState => {
  return useContext(ModalsContext);
};

export default useModals;
