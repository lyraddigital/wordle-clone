import useWordle from "./use-wordle";

const useWordleGrid = (): {
  guesses: ({ key: string; colour: string }[] | undefined)[];
  numberOfTurns: number;
} => {
  const { guesses, numberOfTurns } = useWordle();

  return {
    guesses,
    numberOfTurns,
  };
};

export default useWordleGrid;
