import { AnswerQuestionsHandler } from "../../app/handlers/answerQuestionHandler";
import { GenerateCallTranscriptsHandler } from "../../app/handlers/generateCallTranscriptHandler";
import { ListFilesHandler } from "../../app/handlers/listFilesHandler";
import { ReadFileHandler } from "../../app/handlers/readFileHandler";
import { SummarizeCallTranscriptsHandler } from "../../app/handlers/summarizeCallTranscriptHandler";
import { AIService } from "../../app/services/AIService";
import { FileService } from "../../app/services/fileService";
import { AnswerQuestionsUseCase } from "../../app/usescases/answerQuestionsUseCase";
import { GenerateDataWithAIUseCase } from "../../app/usescases/generateDataWithAIUseCase";
import { ListFilesUseCase } from "../../app/usescases/listFilesUseCase";
import { ReadFileUseCase } from "../../app/usescases/readFileUseCase";
import { SaveFileUseCase } from "../../app/usescases/saveFileUseCase";
import { SummarizeDataUseCase } from "../../app/usescases/summarizeDataUseCase";
import { OpenAIClient } from "../adapters/openAIClient";
const readline = require("readline");

export class CmdApp {

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    FILES_FOLDER = "tmp/files/"

    constructor(
        openAiClient = new OpenAIClient(),
        fileService = new FileService(),
        aiService = new AIService(openAiClient),
        generateCallTranscriptsUseCase = new GenerateDataWithAIUseCase(aiService),
        summarizeCallTranscriptUsecase = new SummarizeDataUseCase(aiService),
        answerQuestionUseCase = new AnswerQuestionsUseCase(aiService),
        saveFileUseCase = new SaveFileUseCase(fileService),
        listFileUseCase = new ListFilesUseCase(fileService),
        readFileUseCase = new ReadFileUseCase(fileService),
        private generateCallTranscriptHandler = new GenerateCallTranscriptsHandler(generateCallTranscriptsUseCase, saveFileUseCase),
        private listFilesHandler = new ListFilesHandler(listFileUseCase),
        private summarizeCallTranscriptHandler = new SummarizeCallTranscriptsHandler(summarizeCallTranscriptUsecase, readFileUseCase),
        private answerQuestionHandler = new AnswerQuestionsHandler(answerQuestionUseCase, readFileUseCase),
        private readFileHandler = new ReadFileHandler(readFileUseCase),
    ) {}

    public start(): void {
        console.log("Console application starting...")
        this.showMenu()
    }

    private showMenu() {
        console.log()
        console.log("----------------------------------------------------")
        console.log("Choose a option:")
        console.log("----------------------------------------------------")
        console.log("1 - Generate call transcripts")
        console.log("2 - List existing call transcripts")
        console.log("3 - show content of file")
        console.log("4 - Summarized call transcript")
        console.log("5 - Ask a question")

        // TODO replace for $ npm install prompt-sync
        this.rl.question("What is your option? ",  (response: string) => {
            this.processResponse(response)
        });
    }

    private async processResponse(response: String): Promise<void> {
        try {
            switch (response) {
                case "1":
                    await this.runGenerateTranscripts()
                    break
                case "2":
                    await this.listFiles()
                    break
                case "3":
                    await this.readFile()
                    break
                case "4":
                    await this.summarizedCallTranscript()
                    break
                case "5":
                    await this.askQuestions()
                    break
                default:
                    console.log("Have a error in your option, please write again")
                    this.showMenu()
                    break
            }    
        } catch (error) {
            console.error("Error: " + error)
            this.showMenu()
        }
    }

    public async runGenerateTranscripts() {
        this.rl.question("What file name do you prefer to save it? ",  async (fileName: string) => {
            this.rl.question("What language do you prefer for the call? ",  async (language: string) => {
                const generatedCall = await this.generateCallTranscriptHandler.handle(this.FILES_FOLDER, fileName, language)
                
                console.log("\nThe generated call is:")
                console.log(generatedCall)

                this.showMenu()
            })
        });
    }

    public async listFiles() {
        console.log("\nList of saved files:")
        const filesNames = await this.listFilesHandler.handle(this.FILES_FOLDER)
        filesNames.forEach(name => console.log("- " + name))

        this.showMenu()
    }

    public async readFile() {
        this.rl.question("What file name do you prefer to read it? ",  async (fileName: string) => {
            const data = await this.readFileHandler.handle(this.FILES_FOLDER, fileName)
            console.log(data)
            this.showMenu()
        });
    }

    public async summarizedCallTranscript() {
        this.rl.question("What file do you want to summarized? ",  async (response: string) => {
            this.rl.question("What language do you prefer for the call? ",  async (language: string) => {
                const summarizedData = await this.summarizeCallTranscriptHandler.handle(this.FILES_FOLDER, response, language)
                console.log("\nThe summary of the call is: ")
                console.log(summarizedData)

                this.showMenu()
            });
        });
    }

    public async askQuestions() {
        this.rl.question("What file do you want to analyze to ask questions? ",  async (response: string) => {
            this.rl.question("ask the questions: ",  async (question: string) => {
                this.rl.question("What language do you prefer for the call? ",  async (language: string) => {
                    const answer = await this.answerQuestionHandler.handle(this.FILES_FOLDER, response, question, language)
                    console.log("\nThe answer is: ")
                    console.log(answer)

                    this.showMenu()
                });
            });
        });
    }
}
