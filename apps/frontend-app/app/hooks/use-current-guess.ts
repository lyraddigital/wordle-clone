import useWordle from "./use-wordle";

const useCurrentGuess = (): string => {
  const { currentGuess } = useWordle();
  return currentGuess;
};

export default useCurrentGuess;
