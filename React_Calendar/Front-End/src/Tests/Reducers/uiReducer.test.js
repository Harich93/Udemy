import { uiReducer } from "../../Reducers/uiReducer"
import { types } from "../../Types/types";

const initialState = {
    modalOpen: false
}

describe('Pruebas en uiReducer', () => {
    
    test('Debe de retornar el estado por defecto', () => {
        
        const state = uiReducer( initialState, {} )
        expect( state ).toEqual( initialState );
    }); 

    test('Debe de abrir y cerrar el modal', () => {
       
        const state = uiReducer( initialState, {type: types.uiOpenModal } );
        expect( state ).toEqual({ modalOpen: true });

        const stateClose = uiReducer( state, {type: types.uiCloseModal } );
        expect( stateClose ).toEqual({ modalOpen: false });

    });
    
    
})
