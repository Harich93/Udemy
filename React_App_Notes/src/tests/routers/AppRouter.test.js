import '../../setupTest'

import React  from 'react';
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { act } from '@testing-library/react';

import { login } from '../../actions/auth';
import { AppRouter } from '../../routers/AppRouter';
import firebase from 'firebase';

jest.mock('../../actions/auth',() => ({
    login: jest.fn(),
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {},
    ui: {
        msgError: null,
        loading: false
    },
    note: {
        active: false,
        notes: []
    }
};
let store = mockStore( initialState )
store.dispatch = jest.fn()




describe('Pruebas en <AppRouter />', () => {
    
    test('Debe de llamar el login si estoy autenticado', async() => {
        
        let user;

        await act( async()=> {

            const userCred = await firebase.auth().signInWithEmailAndPassword('test@testing.com', '123456');
            user = userCred.user;


            const wrapper = mount( 
                <MemoryRouter>
                    <Provider store={ store }>
                        <AppRouter /> 
                    </Provider>
                </MemoryRouter>
            )
        })

        expect( login ).toHaveBeenCalledWith('Me5sh4eWMcXGuIPTY3zzrjJ82cq2', null);
    });
});