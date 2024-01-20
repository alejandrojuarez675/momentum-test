import { SummarizeDataUseCase } from "../../app/usescases/summarizeData";
import { AnswerQuestionsUseCase } from "../../app/usescases/answerQuestions";
import { GenerateDataWithAIUseCase } from "../../app/usescases/generateDataWithAI";
import { ListFilesUseCase } from "../../app/usescases/listFiles";
import { ReadFileUseCase } from "../../app/usescases/readFile";
import { SaveFileUseCase } from "../../app/usescases/saveFile";
import { OpenAIClient } from "../adapters/openAIClient";
import { FileService } from "../../app/services/fileService";
import { AIService } from "../../app/services/AIService";
const readline = require("readline");

export class MenuFunctionalities {

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    FILES_FOLDER = "tmp/files/"

    constructor(
        openAiClient = new OpenAIClient(),
        fileService = new FileService(),
        aiService = new AIService(openAiClient),
        private generateCallTranscripts = new GenerateDataWithAIUseCase(aiService),
        private summarizeCallTranscriptUsecase = new SummarizeDataUseCase(aiService),
        private answerQuestionUseCase = new AnswerQuestionsUseCase(aiService),
        private saveFile = new SaveFileUseCase(fileService),
        private listFile = new ListFilesUseCase(fileService),
        private readFile = new ReadFileUseCase(fileService),
    ){}

    public async runGenerateTranscripts() {
        const generatedCall = await this.generateCallTranscripts.generateSalesCallTranscript();

        console.log(generatedCall);

        this.rl.question("What file name do you prefer to save it? ",  (response: string) => {
            this.saveFile.save({
                dir: this.FILES_FOLDER,
                name: `${response}.txt`,
                data: generatedCall
            });
        });
    }

    public listFiles() {
        console.log("List of saved files:")
        const filesNames = this.listFile.listFilesFrom(this.FILES_FOLDER)
        filesNames.forEach(name => console.log("- " + name))
    }

    public summarizedCallTranscript() {
        this.rl.question("What file do you want to summarized? ",  (response: string) => {
            const data = this.readFile.getContentFrom({
                dir: this.FILES_FOLDER,
                name: `${response}.txt`
            })

            const summarizedData = this.summarizeCallTranscriptUsecase.summarizeData(data)

            console.log("The summary of the call is: ")
            console.log(summarizedData)
        });
    }

    public askQuestions() {
        this.rl.question("What file do you want to analyze to ask questions? ",  (response: string) => {
            const data = this.readFile.getContentFrom({
                dir: this.FILES_FOLDER,
                name: `${response}.txt`
            })

            this.rl.question("ask the questions: ",  (question: string) => {
                const answer = this.answerQuestionUseCase.askAQuestionInThatData(data, question)

                console.log("The answer is: ")
                console.log(answer)
            });
        });
    }
}