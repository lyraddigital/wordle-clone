"use server";

import { apiEndpoint } from "@/lib/utils";

async function submitGuess(): Promise<void> {
  const response = await fetch(`${apiEndpoint}/guesses`, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ guess: "Test" }),
  });

  const responseBody = await response.json();
  console.log(responseBody);
}

export default submitGuess;
