import { Dispatch, SetStateAction } from "react";

import useWordle from "./use-wordle";

const useIsCurrentGuessIncorrectUpdater = (): Dispatch<
  SetStateAction<boolean>
> => {
  const { setIsCurrentGuessIncorrect } = useWordle();
  return setIsCurrentGuessIncorrect;
};

export default useIsCurrentGuessIncorrectUpdater;
