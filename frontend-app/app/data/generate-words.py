import nltk
from nltk.corpus import words

# Ensure the NLTK words corpus is downloaded
nltk.download('words')

# Fetch a list of all English words
word_list = words.words()

# Filter to get only five-letter words and make them lowercase
five_letter_words = set(word.lower() for word in word_list if len(word) == 5)

print(len(five_letter_words))

# We need exactly 50,000 unique words, so we'll ensure we have enough
if len(five_letter_words) < 9000:
    raise ValueError("Not enough unique five-letter words in the dataset.")

# Select the first 50,000 unique five-letter words
selected_words = list(five_letter_words)[:9000]

# Create the TypeScript array code
typescript_code = "const fiveLetterWords: string[] = [\n"
typescript_code += ",\n".join(f'  "{word}"' for word in selected_words)
typescript_code += "\n];\n"

# Save the TypeScript code to a file
file_path = './uniqueFiveLetterWords.ts'
with open(file_path, 'w') as file:
    file.write(typescript_code)

file_path