import '../../../setupTest'

import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
})) 

const middlewares = [thunk];
const mockStore = configureStore( middlewares );

const initialState = {
    auth:{},
    note:{},
    ui:{},
}

const nota = {
    id: '123',
    body: 'Body',
    title: 'Title',
    url: 'http://urlImagen.jpg'
}

const store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <JournalEntry { ...nota } />
    </Provider>
)

describe('Pruebas en <JournalEntry />', () => {
    
    test('Deme mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe de llamar activeNote', () => {
        wrapper.find('.journal__entry').prop('onClick')();

        expect( activeNote ).toHaveBeenCalledWith('123', nota)
    });

});