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
import { LanguageService } from "../../app/services/languageService";
import * as readline from 'node:readline/promises';
import { InvalidLanguageError } from "../../app/errors/invalidLanguageError";
import { FileNotFoundError } from "../../app/errors/fileNotFoundError";
import { FilenameCannotBeEmptyError } from "../../app/errors/filenameCannotBeEmpty";

export class CmdApp {

    FILES_FOLDER = "tmp/files/"

    constructor(
        openAiClient = new OpenAIClient(),
        fileService = new FileService(),
        mongoDbClient = new MongoDbClient(),
        aiService = new AIService(openAiClient),
        dbService = new DbService(mongoDbClient),
        private languageService = new LanguageService(),
        private generateCallTranscriptHandler = new GenerateCallTranscriptsHandler(aiService, fileService, languageService),
        private listFilesHandler = new ListFilesHandler(fileService),
        private summarizeCallTranscriptHandler = new SummarizeCallTranscriptsHandler(aiService, fileService,languageService),
        private answerQuestionHandler = new AnswerQuestionsHandler(aiService, fileService, dbService, languageService),
        private readFileHandler = new ReadFileHandler(fileService),
        private showHistoryHandler = new ShowHistoryHandler(dbService),
    ) {}

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    public start(): void {
        console.log("Console application starting...")
        this.showMenu()
    }

    private async showMenu() {
        console.log()
        console.log("----------------------------------------------------")
        console.log("Choose a option:")
        console.log("----------------------------------------------------")
        console.log("1 - Generate a call transcription")
        console.log("2 - List existing call transcriptions files")
        console.log("3 - Show content of saved call transcriptions")
        console.log("4 - Summarized a call transcription")
        console.log("5 - Ask a question about a call transcription")
        console.log("6 - Show history of Question & Answer")
        console.log()

        const optionSelected = await this.rl.question(this.getOptionSelectedText())
        this.processOptionSelected(optionSelected)
    }

    private async processOptionSelected(optionSelected: String): Promise<void> {
        try {
            switch (optionSelected) {
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
                    console.log("Have a error in your option, please select again")
                    this.showMenu()
                    break
            }    
        } catch (error) {
            console.error("Error: " + error)
            this.showMenu()
        }
    }

    private async runGenerateTranscripts() {
        console.log("")
        const fileName = await this.rl.question(this.getFileNameText())
        const language = await this.rl.question(this.getLanguageText())

        try {
            const generatedCall = await this.generateCallTranscriptHandler.handle(this.FILES_FOLDER, fileName, language)
        
            console.log("\nThe generated call is:")
            console.log(generatedCall)                        
        } catch (error) {
            this.handleErrors(error)        
        }

        this.showMenu()
    }

    private async listFiles() {
        console.log("\nList of saved files:")
        const filesNames = await this.listFilesHandler.handle(this.FILES_FOLDER)
        
        try {
            if (filesNames == null || filesNames.length == 0) {
                console.log("\nList empty")
            }

            filesNames
                .map( x => x.split(".txt")[0])
                .forEach(name => console.log("- " + name))

        } catch (error) {
            this.handleErrors(error)        
        }

        this.showMenu()
    }

    private async readFile() {
        const fileName = await this.rl.question(this.getFileNameText())

        try {
            const data = await this.readFileHandler.handle(this.FILES_FOLDER, fileName)
            console.log("\nThe content is:")
            console.log(data)                
        } catch (error) {
            this.handleErrors(error)        
        }
        this.showMenu()
    }

    private async summarizedCallTranscript() {
        const fileName = await this.rl.question(this.getFileNameText())
        const language = await this.rl.question(this.getLanguageText())

        try {
            const summarizedData = await this.summarizeCallTranscriptHandler.handle(this.FILES_FOLDER, fileName, language)
            console.log("\nThe summary of the call is: ")
            console.log(summarizedData)
        } catch (error) {
            this.handleErrors(error)        
        }
        this.showMenu()
    }

    private async askQuestions() {
        const fileName = await this.rl.question(this.getFileNameText())
        const language = await this.rl.question(this.getLanguageText())
        const question = await this.rl.question(this.getQuestionText())

        try {
            const answer = await this.answerQuestionHandler.handle(this.FILES_FOLDER, fileName, question, language)
            console.log("\nThe answer is: ")
            console.log(answer)
        } catch (error) {
            this.handleErrors(error)        
        }

        this.showMenu()
    }

    private async showHistory() {
        const fileName = await this.rl.question(this.getFileNameText())
        const history = await this.showHistoryHandler.handle(fileName)

        try {
            console.log(`\nThe history for file ${fileName} is the follow:`)
            if (!history || history.length == 0) 
                console.log("Don't have any saved question for file " + fileName)
            
            history.forEach(x => {
                console.log("-----")
                console.log("user: " + x.question)
                console.log("app: " + x.answer)
            })
        } catch (error) {
            this.handleErrors(error)        
        }

        this.showMenu()
    }

    private getOptionSelectedText = () =>  "option: "
    private getFileNameText = () =>  "file id: "
    private getQuestionText = () =>  "question: "
    private getLanguageText = () =>  `desired language (${
        this.languageService.getValidLanguages().map(x => x.toString()).join('-')
    }): `

    private handleErrors(error: any): void {
        if (error instanceof InvalidLanguageError) console.log("\nInvalid language, please try again")
        else if (error instanceof FileNotFoundError) console.log("\nInvalid filename, please try again")
        else if (error instanceof FilenameCannotBeEmptyError) console.log("\nInvalid filename, please try again")
        else console.log("\nHave a error in your option, please select again")
    }

}
