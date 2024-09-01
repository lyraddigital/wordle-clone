import { useContext } from "react";

import WordleContext, { WordleState } from "../context/wordle-context";

const useWordle = (): WordleState => {
  return useContext(WordleContext);
};

export default useWordle;
