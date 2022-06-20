
import Swal from "sweetalert2";
import { fetchConToken } from "../Helpers/fetch";
import { modEventsDate } from "../Helpers/modEventsDate";
import { types } from "../Types/types";

export const startEventAddNew = ( event ) => {
    return async(dispatch, getState) => {

        const { uid, name } = getState().authR;

        try{
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
            
            if ( body.ok ){
                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name
                }
                dispatch( eventAddNew(event) );
                Swal.fire('Evento creado', event.title, 'success')
            } 

        } catch ( error ) {
            console.log( error ) 
        }
    }
}

export const startEventsLoad = () => {
    return async(dispatch) => {

        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();
            
            const events = modEventsDate( body.events );
            
            body.ok && dispatch( eventLoad( events ) );
             

        } catch (error) {
            console.log( error );
        }
    }
}

export const startEventUpdate = ( event ) => {
    return async(dispatch) => {

        try {
            
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body= await resp.json();
            body.ok && dispatch( eventUpdate(event) );

        } catch ( error ) {
            console.log(error)
        }

    }
}

export const startEventDelete = () => {
    return async(dispatch, getState) => {
 
        const { activeEvent: { id } }= getState().calendarR;
        console.log( id )

        try {
            
            const resp = await fetchConToken(`events/${id}`, {},'DELETE');
            const body = await resp.json();
            
            body.ok && 
                dispatch( eventDelete( id ));

            !body.ok &&
                Swal.fire('No eliminado', body.msg, 'error')


        } catch ( error ) {
            console.log( error )
        }
    }
}

export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventRemoveActive = () => ({
    type: types.eventRemoveActive,
});


const eventDelete = ( id ) => ({
    type: types.eventDelete,
    payload: id
})

const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
});

const eventUpdate = ( event ) => ({
    type: types.eventUpdate,
    payload: event
})

const eventLoad = ( events ) => ({
    type: types.eventLoad,
    payload: events
})
