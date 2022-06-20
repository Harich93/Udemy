import '@testing-library/jest-dom'
import '@wojtekmaj/enzyme-adapter-react-17'
import React from 'react';
import { act } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import mount from 'enzyme/build/mount';
import moment from 'moment';
import Swal from 'sweetalert2';

import { CalendarModal } from '../../../Components/calendar/CalendarModal';
import { startEventUpdate, startEventAddNew, eventRemoveActive } from '../../../Actions/event';

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

jest.mock('../../../Actions/event', () => ({
    startEventUpdate: jest.fn(),
    startEventAddNew: jest.fn(),
    eventRemoveActive: jest.fn()
}));


const middlewares = [thunk];
const mockStore = configureStore( middlewares );

const now = moment().minute(0).second(0).add( 1, 'hours');
const nowPlus = moment( now ).add(1, 'hour');

const initialState = {
    calendarR: {
        events: [],
        activeEvent: {
            title: 'Nueva nota',
            notes: 'sad',
            start: now.toDate(),
            end: nowPlus.toDate(),
        }
    },
    authR: {
        uid: '123',
        name: 'Beni'
    },
    uiR: {
        modalOpen: true
    }

};
const store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <CalendarModal />
    </Provider>
)



describe('Pruebas en <CalendarModal />', () => {

    beforeEach(()=>{
        jest.clearAllMocks();
    })
    
    test('Debe de mostrar el modal', () => {
        
        expect( wrapper.find('Modal').prop('isOpen') ).toBe(true);

    })

    test('debe de llamar a la acción actualizar y cerrar el modal', () => {
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( startEventUpdate ).toHaveBeenCalledWith( initialState.calendarR.activeEvent);
        expect( eventRemoveActive ).toHaveBeenCalled();
    });

    test('Debe de mostrar error si falta el titulo', () => {

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( wrapper.find('input[name="title"]').hasClass('is-invalid') ).toBe(true)
    
    })

    test('Debe de crear un nuevo evento', () => {

        const initialState = {
            calendarR: {
                events: [],
                activeEvent: null
            },
            authR: {
                uid: '123',
                name: 'Beni'
            },
            uiR: {
                modalOpen: true
            }
        
        };

        const store = mockStore( initialState );
        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={ store } >
                <CalendarModal />
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'prueba'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( startEventAddNew ).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'prueba',
            notes: '',
            user: expect.any(Object)
        });
        
        expect( eventRemoveActive ).toHaveBeenCalled();
    });

    test('Debe de validar las fechas', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'prueba'
            }
        });

        const hoy = new Date();

        act( () => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy)
        });
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( Swal.fire ).toHaveBeenCalledWith( "Fecha no válida", "Fecha de fin debe ser mayor a fecha de inicio", "error")


    })
    
    
    
})
