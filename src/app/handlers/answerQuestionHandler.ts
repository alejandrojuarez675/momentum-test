import { AnswerQuestionsUseCase } from "../usescases/answerQuestionsUseCase"
import { ReadFileUseCase } from "../usescases/readFileUseCase"

export class AnswerQuestionsHandler {

    constructor(
        private answerQuestionUseCase: AnswerQuestionsUseCase,
        private readFileUseCase: ReadFileUseCase,
    ){}

    public async handle(dir: String, nameFile: String, question: String): Promise<String> {
        const data = await this.readFileUseCase.getContentFrom({
            dir,
            name: `${nameFile}.txt`
        })

        return await this.answerQuestionUseCase.askAQuestionInThatData(data, question)
    }
}