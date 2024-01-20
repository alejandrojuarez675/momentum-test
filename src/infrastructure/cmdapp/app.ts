import { MenuFunctionalities } from "./menuFunctionalities";
import { MENU } from "./menu";
const readline = require("readline");

export class CmdApp {

    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    constructor(
        private menuFunctionalities = new MenuFunctionalities()
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
        MENU.data.forEach(item => console.log(item.option + " - " + item.title))

        // TODO replace for $ npm install prompt-sync
        this.rl.question("What is your option? ",  (response: string) => {
            this.processResponse(response)
        });
    }

    private processResponse(response: String): void {
        try {
            switch (response) {
                case "1":
                    this.menuFunctionalities.runGenerateTranscripts()
                    break
                case "2":
                    this.menuFunctionalities.listFiles()
                    break
                case "3":
                    this.menuFunctionalities.summarizedCallTranscript()
                    break
                case "4":
                    this.menuFunctionalities.askQuestions()
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
}
