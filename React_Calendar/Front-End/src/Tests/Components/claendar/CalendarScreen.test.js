import '@testing-library/jest-dom'
import React from 'react';
import mount from 'enzyme/build/mount';
import { Provider } from 'react-redux';

import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { CalendarScreen } from '../../../Components/calendar/CalendarScreen';
import { messages } from '../../../Helpers/calendar-messages-es';
import { types } from '../../../Types/types';
import { eventSetActive, startEventsLoad } from '../../../Actions/event';

jest.mock('../../../Actions/event', () => ({
    eventSetActive: jest.fn(),
    startEventsLoad: jest.fn()
}));
Storage.prototype.setItem = jest.fn();

const middlewares = [thunk];
const mockStore = configureStore( middlewares );

const initialState = {
    authR: {
        uid: '123',
        name: 'Beni'
    },
    calendarR: {
        events : [],
        activeEvent: false
    },
    uiR: {
        modalOpen: false
    }
};
const store = mockStore( initialState );
store.dispatch = jest.fn();

const wrapper = mount( 
    <Provider store={ store } >
        <CalendarScreen />
    </Provider >
)


describe('Pruebas en <CalendarScreen />', () => {
    
    test('Debe de mostrarse correctamente', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Pruebas con las interacciones del calendario', () => {
        
        const calendar = wrapper.find('Calendar');
        const calendarMessages = calendar.prop('messages');
        expect( calendarMessages ).toEqual( messages );

        calendar.prop('onDoubleClickEvent')();
        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal });
        
        calendar.prop('onSelectEvent')({ start: 'hola'});
        expect( eventSetActive ).toHaveBeenCalledWith({ start: 'hola' });

        calendar.prop('onView')('week');
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week');

    })
    
    
})
