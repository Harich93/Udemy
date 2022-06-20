import moment from 'moment'
import React from 'react'
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';


export const JournalEntry = ( note ) => {

    const {id, body, date, title, url } = note

    const dispatch = useDispatch()

    const noteDate = moment(date);
    
    const handleEditNote = () => {
        dispatch( activeNote( id, note ) );
    }

    return (
        <div 
            className='journal__entry pointer animate__animated animate__fadeIn'
            onClick={ handleEditNote }
        >

            {
                url &&
                    <div
                        className='journal__entry-picture'
                        style={ { 
                            backgroundImage: `URL(${ url })`, 
                            backgroundSize: 'cover'
                        } }
                    ></div>
            }


                <div className='journal__entry-body'>
                    <p className='journal__entry-title'>  
                        { title }
                    </p>
                    <p className='journal__entry-content'>  
                        { body }
                    </p>
                </div>

                <div className='journal__entry-date-box'>
                    <span>{ noteDate.format('dddd') }</span>
                    <h4>{ noteDate.format('Do') }</h4>
                </div>

        </div>
    )
}
