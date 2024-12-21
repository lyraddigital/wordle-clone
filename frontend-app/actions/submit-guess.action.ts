"use server";

import { HttpStatusCode } from "@/lib/enums";
import { ApiSubmitGuessResponse } from "@/lib/types";
import { apiEndpoint } from "@/lib/utils";

function ensureCanProcessResponse(response: Response) {
  const canProcessSubmission =
    response.ok ||
    response.status === HttpStatusCode.badRequest ||
    response.status === HttpStatusCode.notFound;

  if (!canProcessSubmission) {
    throw new Error("Unknown error while trying to make a guess");
  }
}

async function submitGuess(guess: string): Promise<ApiSubmitGuessResponse> {
  const response = await fetch(`${apiEndpoint}/guesses`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ guess }),
  });

  ensureCanProcessResponse(response);

  return (await response.json()) as ApiSubmitGuessResponse;
}

export default submitGuess;
