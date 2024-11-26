import getRandomWord from "@/app/api/data/words";
import RandomWordResult from "@/app/api/models/random-word-result";

export async function GET() {
  const randomWordResult: RandomWordResult = {
    word: getRandomWord(),
  };

  return Response.json(randomWordResult);
}
