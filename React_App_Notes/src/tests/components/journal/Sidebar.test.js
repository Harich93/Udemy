import '../../../setupTest'

import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { Sidebar } from '../../../components/journal/Sidebar';
import { logoutNote } from '../../../actions/notes';
import { startLogout } from '../../../actions/auth';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn(),
}))
jest.mock('../../../actions/notes', () => ({
    logoutNote: jest.fn(),
}))


const middlewares = [thunk];
const mockStore = configureStore( middlewares );

const initialState = {
    auth:{
        name: 'name'
    },
    note: {
        notes: [],
        active: false
    }
}

let store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <MemoryRouter>
            <Sidebar />
        </MemoryRouter>
    </Provider>
)

describe('Pruebas en <Sidebar />', () => {
    
    test('Debe mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });

    test('Debe de llamar a startLogout y logoutNote', () => {
        
        wrapper.find('button').prop('onClick')();

        expect( startLogout ).toHaveBeenCalled();
        expect( logoutNote ).toHaveBeenCalled();


    });
});