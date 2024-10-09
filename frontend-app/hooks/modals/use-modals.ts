import { useContext } from "react";

import ModalsContext, { ModalsState } from "@/contexts/modals-context";

const useModals = (): ModalsState => {
  return useContext(ModalsContext);
};

export default useModals;
