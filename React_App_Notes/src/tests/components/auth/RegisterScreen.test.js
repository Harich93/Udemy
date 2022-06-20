import '../../../setupTest';

import React from 'react';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { RegistrerScreen } from '../../../components/auth/RegistrerScreen';
import { startRegisterWhithEmailPassword } from '../../../actions/auth';
import { setError } from '../../../actions/ui';

jest.mock('../../actions/auth', () => ({
    startRegisterWhithEmailPassword: jest.fn(),
}));

jest.mock('../../actions/ui', () => ({
    setError: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore( middlewares );

const initialState = {
    ui: {
        msgError: null
    }
}

let store = mockStore( initialState )
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <MemoryRouter>
            <RegistrerScreen />
        </MemoryRouter>
    </Provider>
)


describe('Pruebas en <RegisterScreen />', () => {

    beforeEach( () => {
        store = mockStore( initialState )
    })
    
    test('Debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('Debe llamar startRegisterWhithEmailPassword', () => {
        
        wrapper.find('input[name="name"]').simulate('change',{
            target: {
                name: 'name',
                value: 'beni'
            }
        });
        wrapper.find('input[name="email"]').simulate('change',{
            target: {
                name: 'email',
                value: 'beni@gmail.com'
            }
        });
        wrapper.find('input[name="password"]').simulate('change',{
            target: {
                name: 'password',
                value: '1234567'
            }
        });
        wrapper.find('input[name="password2"]').simulate('change',{
            target: {
                name: 'password2',
                value: '1234567'
            }
        })

        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });
        expect( startRegisterWhithEmailPassword ).toHaveBeenCalled();

    });

    test('Debe mostrar el texto con el valor de msgError', () => {
        
        const initialState = {
            ui: {
                msgError: 'Nombre no válido'
            }
        }
        let store = mockStore( initialState )
        const wrapper = mount(
            <Provider store={ store }>
                <MemoryRouter>
                    <RegistrerScreen />
                </MemoryRouter>
            </Provider>
        )

        wrapper.find('form').prop('onSubmit')({ preventDefault(){} });

        expect( wrapper.find('.auth__alert-error').exists() ).toBe(true)
        expect( wrapper.find('.auth__alert-error').text().trim() ).toEqual(initialState.ui.msgError)

    });

});