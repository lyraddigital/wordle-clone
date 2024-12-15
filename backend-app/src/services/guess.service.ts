import GuessColour from "@/app/api/enums/guess-colour";
import GuessLetterResult from "@/app/api/models/guess-letter-result";

const formatGuess = (solution: string, currentGuess: string) => {
  let solutionArray: (string | null)[] = [...solution.split("")];
  let formattedGuess = [...currentGuess.split("")].map<GuessLetterResult>(
    (l) => {
      return { letter: l, colour: GuessColour.grey };
    }
  );

  // find any green letters
  formattedGuess.forEach((l, i) => {
    if (formattedGuess[i] && solutionArray[i] === l.letter) {
      formattedGuess[i].colour = GuessColour.green;
      solutionArray[i] = null;
    }
  });

  // find any yellow letters
  formattedGuess.forEach((l, i) => {
    if (
      formattedGuess[i] &&
      solutionArray.includes(l.letter) &&
      l.colour !== GuessColour.green
    ) {
      formattedGuess[i].colour = GuessColour.yellow;
      solutionArray[solutionArray.indexOf(l.letter)] = null;
    }
  });

  return formattedGuess;
};

export default formatGuess;
