import { IDbService } from "../../src/app/services/interfaces/IDbService";
import { QuestionAndAnswer } from "../../src/domain/questionAnswerDomain";
import { FILE_NAME, MOCKED_ANSWER, MOCKED_QUESTION, MOCKED_QUESTION_AND_ANSWER } from "./constants";

export class DbServiceMock implements IDbService {

    showHistoryForFileName(fileName: String): Promise<QuestionAndAnswer[]> {
        if (
            fileName == FILE_NAME
        ) {
            return Promise.resolve([MOCKED_QUESTION_AND_ANSWER])
        } else {
            throw new Error("Mock option not implemented.");
        }
    }

    saveQuestionAndAnswerForFileName(questionAndAnswer: QuestionAndAnswer, fileName: String): Promise<void> {
        if (
          questionAndAnswer.question == MOCKED_QUESTION &&
          questionAndAnswer.answer == MOCKED_ANSWER &&
          fileName == FILE_NAME
        ) {
          return Promise.resolve();
        } else {
          throw new Error("Mock option not implemented.");
        }
    }
}