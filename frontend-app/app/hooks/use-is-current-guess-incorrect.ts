import useWordle from "./use-wordle";

const useIsCurrentGuessIncorrect = (): boolean => {
  const { isCurrentGuessIncorrect } = useWordle();
  return isCurrentGuessIncorrect;
};

export default useIsCurrentGuessIncorrect;
