import { QuestionAndAnswer } from "../../src/domain/questionAnswerDomain"
import { ValidLanguage } from "../../src/domain/validLanguageSupport"

export const NOT_ALLOWED_LANGUAGE = "arabian"
export const DIR_FILE = "./"
export const FILE_NAME = "chat-example"
export const FILE_NAME_WITH_EXTENSION = "chat-example.txt"
export const MOCKED_QUESTION = "What is the seller name?"
export const MOCKED_ANSWER = "The name of the seller is Sarah"

export const MOCKED_QUESTION_AND_ANSWER: QuestionAndAnswer = {
    question: MOCKED_QUESTION,
    answer: MOCKED_ANSWER
}

export const MOCKED_VALID_LANGUAGE = ValidLanguage.english