import React from 'react';
import mount from 'enzyme/build/mount';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { LoginScreen } from '../../../Components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../Actions/auth';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

jest.mock('../../../Actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore( middlewares );

const initialState = {};
const store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <LoginScreen />
    </Provider>
)


describe('Pruebas en <LoginScreen />', () => {

    beforeEach(()=> {
        jest.clearAllMocks();
    })
    
    test('Debe de mostrarse correctamente ', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de llamar el dispatch del login', () => {
        
        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'beni@gmail.com'
            }
        });
        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        })

        expect( startLogin ).toHaveBeenCalledWith('beni@gmail.com', '123456')

    });


    test('No hay registro si las contraseñas son diferentes', () => {

        wrapper.find('input[name="rEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'beni@gmail.com'
            }
        });
        wrapper.find('input[name="rName"]').simulate('change', {
            target: {
                name: 'rName',
                value: 'Beni'
            }
        });
        wrapper.find('input[name="rPassword"]').simulate('change', {
            target: {
                name: 'rPassword',
                value: '123456'
            }
        });
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '1234567'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startRegister ).toHaveBeenCalledTimes(0);
        expect( Swal.fire ).toHaveBeenCalledWith('Error','The passwords must be equal','error');
    
    });


    test('Registro correcto', () => {
        wrapper.find('input[name="rEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'jesus@gmail.com'
            }
        });
        wrapper.find('input[name="rName"]').simulate('change', {
            target: {
                name: 'rName',
                value: 'Jesus'
            }
        });
        wrapper.find('input[name="rPassword"]').simulate('change', {
            target: {
                name: 'rPassword',
                value: '123456'
            }
        });
        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '123456'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        expect( Swal.fire ).toHaveBeenCalledTimes(0);
        expect( startRegister ).toHaveBeenCalledTimes(1);
    })
    
    
    
    
})
