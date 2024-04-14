import fs from "fs";
import path from "path";
import { getSynonyms } from "./api/datamuse";
import { getWordDefinition } from "./api/definition";

export async function getRandomWordFromFile(dayNumber) {
  const filePath = path.join(process.cwd(), "./public/filteredWords.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const words = data.split("\n");

  if (dayNumber === "-1") {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex].trim();
  }
  const randomIndex = dayNumber % words.length;
  return words[randomIndex].trim();
}

export async function getDailyWord(dayNumber) {
  const filePath = path.join(process.cwd(), "./public/chosenWords.txt");
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n");
  const index = dayNumber - 1;

  if (index >= 0 && index < lines.length) {
    const line = lines[index].trim();
    let synonyms = null;
    let definition = null;

    const word = line.split("[")[0].trim();
    if (line.includes("[")) {
      synonyms = line
        .split("[")[1]
        .split("]")[0]
        .trim()
        .split(", ")
        .map((syn) => syn.trim());
    }
    if (line.includes("{")) {
      console.log("swag");
      definition = line.split("{")[1].split("}")[0].trim();
      console.log(definition);
    }

    if (!synonyms) {
      synonyms = await getSynonyms(word);
    }

    if (!definition) {
      definition = await getWordDefinition(word);
    }

    return {
      word: word,
      synonyms: synonyms || [],
      definition: definition || "No definition found",
    };
  } else {
    const word = await getRandomWordFromFile(dayNumber);
    const synonyms = await getSynonyms(word);
    const definition = await getWordDefinition(word);
    return {
      word,
      synonyms: synonyms || [],
      definition: definition || "No definition found",
    };
  }
}
