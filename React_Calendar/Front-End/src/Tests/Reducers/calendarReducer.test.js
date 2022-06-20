import { calendarReducer } from "../../Reducers/calendarReducer"
import { types } from "../../Types/types"


const initialState = {
    events: [],
    activeEvent: null
}

const event = {
    title: 'titulo',
    notes: '',
    start: '2021-07-23T09:00:00.886Z',
    end: '2021-07-23T10:00:00.886Z',
    user: [Object],
    id: "60fa82c010740e0015eb47fT"

}
const eventUpdate = {
    title: 'titulo2',
    notes: '',
    start: '2021-07-23T09:00:00.886Z',
    end: '2021-07-23T10:00:00.886Z',
    user: [Object],
    id: "60fa82c010740e0015eb47fT"

}

describe('Pruebas en calendarReducer', () => {
    
    test('Debe agregar un evento, actualizarlo, ponerlo activo, deshacer activo y eliminarlo', () => {

        const actionAdd = { type: types.eventAddNew, payload: event }; 
        const state = calendarReducer( initialState, actionAdd );

        expect( state ).toEqual({
            events: [
              {
                title: 'titulo',
                notes: '',
                start: '2021-07-23T09:00:00.886Z',
                end: '2021-07-23T10:00:00.886Z',
                user: [Object],
                id: '60fa82c010740e0015eb47fT'
              }
            ],
            activeEvent: null
        });

        const actionUpdate = { type: types.eventUpdate, payload: eventUpdate }; 
        const stateUpdate = calendarReducer( state, actionUpdate );

        expect( stateUpdate ).toEqual({
            events: [
              {
                title: 'titulo2',
                notes: '',
                start: '2021-07-23T09:00:00.886Z',
                end: '2021-07-23T10:00:00.886Z',
                user: [Object],
                id: '60fa82c010740e0015eb47fT'
              }
            ],
            activeEvent: null
        });

        const actionActive = { type: types.eventSetActive, payload: eventUpdate }; 
        const stateActive = calendarReducer( stateUpdate, actionActive);

        expect( stateActive ).toEqual({
            ...stateUpdate,
            activeEvent: {
                title: 'titulo2',
                notes: '',
                start: '2021-07-23T09:00:00.886Z',
                end: '2021-07-23T10:00:00.886Z',
                user: [Object],
                id: '60fa82c010740e0015eb47fT'
              }
        });

        const actionInActive = { type: types.eventRemoveActive  }; 
        const stateInActive = calendarReducer( stateActive, actionInActive);

        expect( stateInActive).toEqual({
            ...stateActive,
            activeEvent: null
        });

        const actionDelete = { type: types.eventDelete, payload: event.id };
        const stateDelete = calendarReducer( stateInActive, actionDelete );

        expect( stateDelete ).toEqual( initialState );
        
    });
    
})
