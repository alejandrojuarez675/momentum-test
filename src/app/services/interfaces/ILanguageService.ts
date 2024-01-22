import { ValidLanguage } from "../../../domain/validLanguageSupport"

export interface ILanguageService {
    getValidLanguages(): ValidLanguage[]

    /**
     * @throws {InvalidLanguageError}
     */
    validateLanguage(language: String): ValidLanguage 
}