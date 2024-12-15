import GuessColour from "@/app/api/enums/guess-colour";

type GuessLetterResult = {
  letter: string;
  colour: GuessColour;
};

export default GuessLetterResult;
