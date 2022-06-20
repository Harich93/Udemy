import '../../../setupTest';

import React from 'react';
import thunk from "redux-thunk";
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startGoogleLogin, startLoginEmailPass } from '../../../actions/auth';
import { setError, removeError } from '../../../actions/ui';

jest.mock('../../../actions/auth',() => ({
    startLoginEmailPass: jest.fn(),
    startGoogleLogin: jest.fn()
}));

jest.mock('../../../actions/ui',() => ({
    setError: jest.fn(),
    removeError: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {},
    ui: {
        msgError: null,
        loading: false
    }
};
let store = mockStore( initialState )
store.dispatch = jest.fn()

const wrapper = mount( 
    <MemoryRouter>
        <Provider store={ store }>
            <LoginScreen /> 
        </Provider>
    </MemoryRouter>
)

describe('Pruebas en <LoginScreen />', () => {

    beforeEach( () => {
        store = mockStore( initialState )
    })

    test('Debe mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot(); 

    });

    test('Debe llamar startLoginEmailPass', () => {
        
        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'beni@gmail.com'
            }
        });
        wrapper.find('input[name="password"]').simulate('change', {
            target: {
                name: 'password',
                value: '123456'
            }
        });


        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
        expect( startLoginEmailPass ).toHaveBeenCalledWith("beni@gmail.com", "123456")

    });

    test('Debe saltar error en email', () => {
        
        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'beni@gmacom'
            }
        });

        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
        
        expect( setError ).toHaveBeenCalledWith('Email is not valid');
        expect( removeError ).not.toHaveBeenCalled();
    });

    test('Debe saltar error en password', () => {
        
        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'beni@gmail.com'
            }
        });
        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'password',
                value: '123'
            }
        });

        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
        
        expect( setError ).toHaveBeenCalledWith('Password should be at least 6 characters and match each other');
        expect( removeError ).not.toHaveBeenCalled();
    });

    test('Debe de mostrar el msgError', () => {
        
        const initialState = {
            auth: {},
            ui: {
                msgError: 'Email incorrecto',
                loading: false
            }
        };
        let store = mockStore( initialState );

        const wrapper = mount( 
            <MemoryRouter>
                <Provider store={ store }>
                    <LoginScreen /> 
                </Provider>
            </MemoryRouter>
        )

        expect( wrapper.find('.auth__alert-error').exists() ) .toBe( true );
        expect( wrapper.find('.auth__alert-error').text().trim() ) .toEqual( 'Email incorrecto' );
        
    });

    test('Debe de disparar la autenticación con Google', () => {
        
        wrapper.find('.auth__social-networks').prop('onClick')();
        expect( startGoogleLogin ).toHaveBeenCalled()

    });


});