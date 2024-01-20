import { AnswerQuestionsHandler } from "../../app/handlers/answerQuestionHandler";
import { GenerateCallTranscriptsHandler } from "../../app/handlers/generateCallTranscriptHandler";
import { ListFilesHandler } from "../../app/handlers/listFilesHandler";
import { ReadFileHandler } from "../../app/handlers/readFileHandler";
import { ShowHistoryHandler } from "../../app/handlers/showHistoryHandler";
import { SummarizeCallTranscriptsHandler } from "../../app/handlers/summarizeCallTranscriptHandler";
import { AIService } from "../../app/services/AIService";
import { DbService } from "../../app/services/dbService";
import { FileService } from "../../app/services/fileService";
import { MongoDbClient } from "../adapters/db/mongoClient";
import { OpenAIClient } from "../adapters/clients/openAIClient";
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
        mongoDbClient = new MongoDbClient(),
        aiService = new AIService(openAiClient),
        dbService = new DbService(mongoDbClient),
        private generateCallTranscriptHandler = new GenerateCallTranscriptsHandler(aiService, fileService),
        private listFilesHandler = new ListFilesHandler(fileService),
        private summarizeCallTranscriptHandler = new SummarizeCallTranscriptsHandler(aiService, fileService),
        private answerQuestionHandler = new AnswerQuestionsHandler(aiService, fileService, dbService),
        private readFileHandler = new ReadFileHandler(fileService),
        private showHistoryHandler = new ShowHistoryHandler(dbService),
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
        console.log("6 - show history of Q&A")

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
                case "6":
                    await this.showHistory()
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

    showHistory() {
        this.rl.question("What file do you want to analyze to ask questions? ",  async (nameFile: string) => {
            const history = await this.showHistoryHandler.handle(nameFile)

            console.log(`The history for file ${nameFile} is the follow:`)
            if (!history || history.length == 0) 
                console.log("Don't have any saved question for file " + nameFile)
            
            history.forEach(x => {
                console.log("-----")
                console.log("user: " + x.question)
                console.log("app: " + x.answer)
            })

            this.showMenu()
        })
    }
}
