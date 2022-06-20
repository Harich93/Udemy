import { types } from "../../Types/types"

describe('Pruebas en types.js', () => {
    
    test('Los types deben ser iguales', () => {

        expect( types ).toEqual({
            authLogin: '[auth] Login',
            authLogout: '[auth] Logout',
            authCheckingFinish: '[auth] Finish cheking login state',
        
        
            uiOpenModal: '[ui] Open modal',
            uiCloseModal: '[ui] Colse modal',
        
            eventAddNew: '[event] Add new',
            eventLoad: '[event] Load',
            eventUpdate: '[event] Update',
            eventDelete: '[event] Delete',
            eventSetActive: '[event] Set active',
            eventRemoveActive: '[event] Remove active',
        });
        
    })
    
})
