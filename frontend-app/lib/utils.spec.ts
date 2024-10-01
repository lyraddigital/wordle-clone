import {
  gamesPlayedKey,
  gamesWonKey,
  guessDistributionKey,
  isDarkModeKey,
  maxStreakKey,
  streakKey,
} from "./utils";

describe("utils", () => {
  it("all local storage keys are correct", () => {
    expect(gamesPlayedKey).toBe("ld:wordle:gamesPlayed");
    expect(gamesWonKey).toBe("ld:wordle:gamesWon");
    expect(guessDistributionKey).toBe("ld:wordle:guessDistribution");
    expect(isDarkModeKey).toBe("ld:wordle:isDarkMode");
    expect(maxStreakKey).toBe("ld:wordle:maxStreak");
    expect(streakKey).toBe("ld:wordle:streak");
  });
});
