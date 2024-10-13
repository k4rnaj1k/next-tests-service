"use server";
import { readFile, readFileSync, readdirSync } from "fs";
import { Questionaire, QuestionaireData } from "../types/test";

export async function loadTestsData(): Promise<QuestionaireData[]> {
  const folder = readdirSync("tests");
  const questionaireNames = await Promise.all(folder.map(loadTest));
  return questionaireNames;
}

export async function loadTest(filename: string): Promise<QuestionaireData> {
  const fileData = readFileSync("tests/" + filename);
  const questionaireData: Questionaire = JSON.parse(fileData.toString());
  console.log(questionaireData.questions.length + ' ' + filename)
  const questionsAmount = questionaireData.questions.length;
  return {
    ...questionaireData,
    questionsAmount,
    filename: filename.replace(".json", ""),
  };
}
