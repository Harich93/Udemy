import { login, logout, startLoginEmailPass, startLogout } from "../../actions/auth";
import { types } from "../../types/types";
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk";
import { startLoading } from "../../actions/ui";

const middlewares = [thunk];
const storeMock = configureStore( middlewares )

const initialState = {};
let store = storeMock( initialState );



describe('Pruebas en actions auth', () => {

    beforeEach( () => {
        store = storeMock( initialState )
    })
    
    test('Login y logout deben de crear la accion respectiva', () => {
        
        const actionLogin = login( '123', 'test');
        expect( actionLogin ).toEqual({
            type: types.login,
            payload: {
                uid: '123',
                displayName: 'test'
            }
        });

        const actionLogout = logout();
        expect( actionLogout ).toEqual({
            type: types.logout
        });
    });

    test('debe realizar el startLogout', async() => {
        
        await store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.logout
        });

        expect( actions[1] ).toEqual({
            type: types.notesLogoutCleaning
        });

    });

    test('Debe de iniciar el startLoginEmailPass', async() => {
        
        await store.dispatch( startLoginEmailPass('test@testing.com', '123456') );

        const actions = store.getActions();
        console.log( actions )

        expect( actions[0] ).toEqual({
            type: types.uiStartLoading
        });

        expect( actions[1] ).toEqual({
            type: types.login,
            payload: {
                uid: expect.any(String),
                displayName: null
            }
        });

        expect( actions[2] ).toEqual({
            type: types.uiFinishLoading
        });


    });

});