import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import '@testing-library/jest-dom';
import { openModal } from "../../../Actions/ui";
import { AddNewFab } from '../../../Components/Ui/AddNewFab';

jest.mock('../../../Actions/ui', () => ({
    openModal: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <AddNewFab />
    </Provider >
)


describe('Pruebas en AddNewFab', () => {

    test('debe mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });
    
    
    test('Debe de llamar a openModal', () => {

        wrapper.find('button').prop('onClick')();
        expect( openModal ).toHaveBeenCalled();
        
    })
    
})
