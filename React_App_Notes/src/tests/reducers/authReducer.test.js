import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

describe('Pruebas en authReducer', () => {
    
    test('Debe devolver el initialState', () => {
        
        const state = authReducer( { logged: false }, {} );
        expect( state ).toEqual({ logged: false });

    });

    test('Debe devolver uid y name del usuario', () => {
        
        const action = {
            type: types.login,
            payload: {
                uid: '1234',
                displayName: 'rafa',
            }
        }

        const state = authReducer( { logged: false }, action);
        expect( state ).toEqual({
            uid: '1234',
            name: 'rafa'
        })

    });

    test('Debe de retornar {}', () => {

        const action = { type: types.logout }
        
        const state = authReducer( { uid: '1234', name: 'rafa' }, action );
        expect( state ).toEqual({});
    });
});