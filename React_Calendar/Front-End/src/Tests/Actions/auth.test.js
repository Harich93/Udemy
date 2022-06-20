import congifureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import '@testing-library/jest-dom'
import { logout, startChecking, startLogin, startRegister } from '../../Actions/auth';
import Swal from 'sweetalert2';
import { types } from '../../Types/types';
import * as fetchModule from '../../Helpers/fetch'

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = congifureStore( middlewares );

const initState = {};
let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();

describe('Pruebas en las Actions auth', () => {

    beforeEach( ()=> {
        store = mockStore( initState );
    });



    test('startLogin correcto', async() => {
        
        await store.dispatch( startLogin('beni@gmail.com', '123456') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '60f54c2ca96e87393cad9c05',
                name: 'Beni'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        // token = localStorage.setItem.mock.calls[0][1];

    });




    test('startLogin incorrecto', async() => {
       
        await store.dispatch( startLogin('beni@gmail.com', '123457') );
        let actions = store.getActions();

        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith( "Error", "Invalid password", "error");


        await store.dispatch( startLogin('beni@gmail4.com', '123456') );
         actions = store.getActions();

        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith("Error", "User not exists with this email", "error");

    });




    test('startRegister correcto', async() => {

        fetchModule.fetchSinToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123ACDFWS'
                }
            }
        }));
        
        await store.dispatch( startRegister('test@test.com', '123456', 'test') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos',
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123ACDFWS');
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });




    test('startChecking correcto', async() => {

        fetchModule.fetchConToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'carlos',
                    token: 'ABC123ACDFWS'
                }
            }
        }));
        
        await store.dispatch( startChecking() );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'carlos',
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123ACDFWS');

    });



    test('logout correcto', () => {
        
        store.dispatch( logout )
        const actions = store.getActions();

        expect( actions ).toEqual( [] );

    });
    
    
})
