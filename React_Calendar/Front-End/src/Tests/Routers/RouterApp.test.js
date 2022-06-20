
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'
import {mount} from 'enzyme';

import { RouterApp } from '../../Routers/RouterApp';
import '@testing-library/jest-dom';
import { startChecking } from '../../Actions/auth';


const middlewares = [thunk];
const mockStore = configureStore( middlewares );



describe('Pruebas en RouterApp', () => {
    
    test('Debe de mostrar el espere...', () => {
        
        const initialState = {
            authR: {
                checking: true
            }
        };
        const store = mockStore( initialState );
        
        const wrapper = mount(
            <Provider store= { store } >
                <RouterApp />
            </Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        
    });
    
    
    
    test('Debe la ruta pública', () => {
        
        const initialState = {
            authR: {
                checking: false,
                uid: null
            }
        };
        const store = mockStore( initialState );
        
        const wrapper = mount(
            <Provider store= { store } >
                <RouterApp />
            </Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.login-container').exists() ).toBe(true);
        
    });
    
    test('Debe la ruta privada', () => {
        
        const initialState = {
            authR: {
                checking: false,
                uid: true 
            },
            calendarR: {
                events: [],
                activeEvent: null
            },
            uiR: {
                modalOpen: false
            }
        };
        const store = mockStore( initialState );
        
        const wrapper = mount(
            <Provider store= { store } >
                <RouterApp />
            </Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.calendar-screen').exists() ).toBe(true);
        
    });
    
    // test('Debe llamar startChecking', () => {
        
    //     jest.mock('../../Actions/auth', () => ({
    //         startChecking: jest.fn()
    //     }))

    //     const initialState = {
    //         authR: {
    //             checking: true
    //         }
    //     };
    //     const store = mockStore( initialState );
    //     store.dispatch = jest.fn();
        
    //     const wrapper = mount(
    //         <Provider store= { store } >
    //             <RouterApp />
    //         </Provider>
    //     );
        
    //     expect( startChecking ).toHaveBeenCalled();
//     })
})
