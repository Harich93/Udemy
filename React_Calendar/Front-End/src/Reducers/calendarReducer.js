
import { types } from "../Types/types";


const initialState = {
    events: [],
    activeEvent: null
}

export const calendarReducer =( state = initialState, action ) => {

    switch (action.type) {
        
        case types.eventAddNew:
            return {
                ...state,
                events: [ action.payload, ...state.events]
            }

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventRemoveActive:
            return{
                ...state,
                activeEvent: null
            }
        
        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map( ev => ev.id === action.payload.id ? action.payload : ev )
            }

        case types.eventDelete:
            return {
                ...state,
                events: state.events.filter( ev => ev.id !== action.payload ),
                activeEvent: null
            }

        case types.eventLoad: 
            return {
                ...state,
                events: action.payload
            }
    
        default:
            return state;
    }
}