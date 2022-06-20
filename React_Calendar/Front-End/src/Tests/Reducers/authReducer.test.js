
import { authReducer } from "../../Reducers/authReducer"
import { types } from "../../Types/types"

const initialState = {
    checking: true
}

const user = {
    name: 'Beni', 
    uid: '60f54c2ca96e87393cad9c05'
}


describe('Pruebas en authReducer', () => {
    
    test('Debe mostrar el nombre y uid del usuario autenticado y checking en false. Al hacer el logout volver al estado iniciaa', () => {
        
        const action = { type: types.authLogin, payload: user };
        const state = authReducer( initialState, action );
        expect( state ).toEqual({
            checking: false,
            uid: '60f54c2ca96e87393cad9c05',
            name: 'Beni'
        });


        const actionLogout = { type: types.authLogout }
        const stateLogout = authReducer( state, actionLogout );

        expect( stateLogout ).toEqual({ checking: true });

    });



    test('Deme mostrar checking: false', () => {
        
        const action = { type: types.authCheckingFinish };
        const state = authReducer( initialState, action );
        expect( state ).toEqual({ checking: false });

    });


    
    test('Deme mostrar checking: false', () => {
    
        const action = { type: types.authCheckingFinish };
        const state = authReducer( initialState, action );

        expect( state ).toEqual({ checking: false });

    });
})
