import { expect, test } from '@jest/globals';
import { describe } from 'node:test';
import { InvalidLanguageError } from '../../../src/app/errors/invalidLanguageError';
import { LanguageService } from '../../../src/app/services/languageService';
import { ValidLanguage } from '../../../src/domain/validLanguageSupport';
import { MOCKED_NOT_ALLOWED_LANGUAGE } from '../../mocks/constants';

describe('LanguageService', () => {
    const languageService = new LanguageService()
    
    describe('validateLanguage', () => {
    
        test('language cannot be empty', () => {
            expect(() => languageService.validateLanguage('')).toThrow(InvalidLanguageError)
        })
    
        test('have to return the valid language', () => {
            expect(languageService.validateLanguage('spanish')).toBe(ValidLanguage.spanish)
        })
    
        test('have to validate languages on allowed list', () => {
            expect(() => languageService.validateLanguage(MOCKED_NOT_ALLOWED_LANGUAGE)).toThrow(InvalidLanguageError)
        })
    
    })
    
    describe('getValidLanguages', () => {
        test('all values have to be valid', () => {
            languageService.getValidLanguages().forEach(language => {
                expect(languageService.validateLanguage(language)).toBe(language)
            })
        })
    })
})