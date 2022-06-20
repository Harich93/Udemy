import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom' ;
import { DeleteEventFab } from '../../../Components/Ui/DeleteEventFab';
import { startEventDelete  } from '../../../Actions/event';

jest.mock('../../../Actions/event', () => ({
    startEventDelete: jest.fn()
}));

const middlewares = [thunk];
const mockstore = configureStore( middlewares );

const initState = {};
let store = mockstore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <DeleteEventFab />
    </Provider>
)


describe('Pruebas en DeleteEventfab', () => {
    
    test('Debe mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });



    test('Debe de llamar handleDelete', () => {
        
        wrapper.find('button').prop('onClick')();
        expect( startEventDelete ).toHaveBeenCalled();

    })
    
    
})
