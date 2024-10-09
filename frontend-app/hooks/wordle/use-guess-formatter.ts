import useWordle from "./use-wordle";

const formatGuess = (currentGuess: string, solution: string) => {
  let solutionArray: (string | null)[] = [...solution.split("")];
  let formattedGuess = [...currentGuess.split("")].map((l) => {
    return { key: l, colour: "grey" };
  });

  // find any green letters
  formattedGuess.forEach((l, i) => {
    if (solutionArray[i] === l.key) {
      formattedGuess[i].colour = "green";
      solutionArray[i] = null;
    }
  });

  // find any yellow letters
  formattedGuess.forEach((l, i) => {
    if (solutionArray.includes(l.key) && l.colour !== "green") {
      formattedGuess[i].colour = "yellow";
      solutionArray[solutionArray.indexOf(l.key)] = null;
    }
  });

  return formattedGuess;
};

export default function useGuessFormatter(): () => {
  key: string;
  colour: string;
}[] {
  const { currentGuess, solution } = useWordle();
  return () => formatGuess(currentGuess, solution);
}
