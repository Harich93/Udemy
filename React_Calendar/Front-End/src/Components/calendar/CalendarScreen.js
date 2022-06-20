import React, { useEffect, useRef, useState } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import { messages } from '../../Helpers/calendar-messages-es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

import { Navbar } from '../Ui/Navbar';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { openModal } from '../../Actions/ui';
import { useDispatch, useSelector } from 'react-redux';
import { eventRemoveActive, eventSetActive, startEventsLoad } from '../../Actions/event';
import { AddNewFab } from '../Ui/AddNewFab';
import { DeleteEventFab } from '../Ui/DeleteEventFab';


moment.locale('es');

const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {
    
    const dispatch = useDispatch();
    const { events: eventsList, activeEvent } = useSelector(state => state.calendarR)
    const { uid } = useSelector(state => state.authR)
    const refListLength = useRef(eventsList.length)

    useEffect(() => {
        if( eventsList.length === 0 || eventsList.length !== refListLength.current ) {
            dispatch( startEventsLoad() );
            refListLength.current = eventsList.length;
        }
    }, [dispatch, eventsList.length]);


    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month')

    const onDoubleClick = () => {
        dispatch( openModal() )
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive( e ) );
    }

    const onViewChange = (e) => {
        setLastView(e);
        localStorage.setItem( 'lastView', e );
    }

    const eventeStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor:( uid === event.user._id ? '#367CF7' : '#466660'),
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }

    }

    const handleOnSelectSlot = (e) => {
        console.log(e);
        dispatch( eventRemoveActive )
    }

    return (
        <div className='calendar-screen'>
            <Navbar />

            <Calendar
                localizer={localizer}
                events={ eventsList }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventeStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onSelectSlot={ handleOnSelectSlot }
                selectable={ true }
                onView={ onViewChange }
                view={ lastView }
                components={{
                    event: CalendarEvent,
                }}
            />
            <AddNewFab />
            
            { activeEvent && <DeleteEventFab /> }
            
            <CalendarModal />
        </div>
    )
}
