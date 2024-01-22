import { IClientAI } from "../../../src/app/ports/IClientAI";
import {
  MOCKED_ANSWER,
  MOCKED_QUESTION,
  MOCKED_VALID_LANGUAGE,
} from "../constants";
import { promises as fs } from "fs";

export class ClientAiMock implements IClientAI {
  async askAQuestionBasedOnData(
    data: String,
    question: String,
    language: String
  ): Promise<String> {
    if (
      data == (await this.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE)) &&
      question == MOCKED_QUESTION &&
      language == MOCKED_VALID_LANGUAGE
    ) {
      return Promise.resolve(MOCKED_ANSWER);
    } else {
      throw new Error("Mock option not implemented.");
    }
  }

  async summarizedData(data: String, language: String): Promise<String> {
    if (
      data == (await this.generateSalesCallTranscript(MOCKED_VALID_LANGUAGE)) &&
      language == MOCKED_VALID_LANGUAGE
    ) {
      return await fs.readFile("tests/mocks/summary-example.txt", {
        encoding: "utf8",
      });
    } else {
      throw new Error("Mock option not implemented.");
    }
  }

  async generateSalesCallTranscript(language: String): Promise<String> {
    if (language == MOCKED_VALID_LANGUAGE) {
      return await fs.readFile("tests/mocks/chat-example.txt", {
        encoding: "utf8",
      });
    } else {
      throw new Error("Mock option not implemented.");
    }
  }

  translate(data: String, from: String, to: String): Promise<String> {
    throw new Error("Method not implemented.");
  }
}
