import '../../../setupTest';

import React from 'react';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { NoteScreen } from '../../../components/notes/NoteScreen';
import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}))

const middlewrares = [thunk];
const mockStore = configureStore( middlewrares );

const initialState = {
        auth:{
            uid: '1',
            name: 'test'
        },
        ui:{
            loading: false,
            msgError: null
        },
        note: {
            active: {
                id: '123',
                title: 'Titulo',
                body: 'Body',
                url: 'http://urlImagen.jpg'
            },
            notes: []
        }
}

const store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <NoteScreen />
    </Provider>
)



describe('Pruebas en <NoteScreen />', () => {
    
    test('Debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    });

    test('Debe de llamar al activeNote', () => {
        
        wrapper.find('input[name="title"]').simulate('change',{
            target:{
                name: 'title',
                value: 'titulo cambiado'
            }
        })
        
        expect( activeNote ).toHaveBeenCalledWith('123',  {
            body: "Body",
            id: "123",
            title: "titulo cambiado",
            url: "http://urlImagen.jpg",
        })

    });
});