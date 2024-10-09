import { useContext } from "react";

import WordleContext, { WordleState } from "@/contexts/wordle-context";

const useWordle = (): WordleState => {
  return useContext(WordleContext);
};

export default useWordle;
