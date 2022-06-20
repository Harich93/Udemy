
import { types } from "../../types/types";

describe('Pruebas en types.js', () => {
    
    test('Debe de ser iguales', () => {
        
        expect( types ).toEqual({
            login: '[Auth] login',
            logout: '[Auth] logout',
        
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
        
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',
        
            notesAddNew: '[Notes] New note',
            notesDeleted: '[Notes] Deleted note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load note',
            notesUpdated: '[Notes] Update note',
            notesFileUrl: '[Notes] Updated image url',
            notesLogoutCleaning: '[Notes] Cleaning logout',
        })

    });
});