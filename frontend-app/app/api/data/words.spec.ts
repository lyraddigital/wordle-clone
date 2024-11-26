import getRandomWord, { wordExists } from "./words";

describe("words", () => {
  it("getRandomWord retrieves correctly a random word from the words array", () => {
    // Arrange
    const expectedIndex = 0;
    const mathRandomSpy = jest.spyOn(Math, "random");

    mathRandomSpy.mockImplementationOnce(() => expectedIndex);

    // Action
    const word = getRandomWord();

    // Assert
    expect(word).toBe("hamsa");
  });

  it("wordExists returns true if a word is in the words array", () => {
    // Arrange
    const word = "daryl";

    // Action
    const exists = wordExists(word);

    // Assert
    expect(exists).toBe(true);
  });

  it("wordExists returns false if a word is not in the words array", () => {
    // Arrange
    const word = "aaaaa";

    // Action
    const exists = wordExists(word);

    // Assert
    expect(exists).toBe(false);
  });
});
