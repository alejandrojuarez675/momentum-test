import { ValidLanguage } from "../../domain/validLanguageSupport";
import { InvalidLanguageError } from "../errors/invalidLanguageError";

export class LanguageService {

    public getValidLanguages(): ValidLanguage[] {
        return Object.values(ValidLanguage)
    }

    /**
     * @throws {InvalidLanguageError}
     */
    public validateLanguage(language: String): ValidLanguage {
        if (!language) { throw new InvalidLanguageError() }

        const indexOf = Object.values(ValidLanguage).indexOf(language as unknown as ValidLanguage)
        if (indexOf == -1) {
            throw new InvalidLanguageError()
        }

        return Object.keys(ValidLanguage)[indexOf] as ValidLanguage
    } 
}