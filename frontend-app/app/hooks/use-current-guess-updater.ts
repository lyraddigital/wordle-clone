import { Dispatch, SetStateAction } from "react";

import useWordle from "./use-wordle";

const useCurrentGuessUpdater = (): Dispatch<SetStateAction<string>> => {
  const { setCurrentGuess } = useWordle();
  return setCurrentGuess;
};

export default useCurrentGuessUpdater;
