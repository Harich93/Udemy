import React from 'react'
import { useSelector } from 'react-redux'
import { JournalEntry } from './JournalEntry'

export const JournalEntries = () => {
    
    const { notes }  = useSelector(state => state.note)

    return (
        <div className='journal__entries  animate__animated animate__fadeInLeft animate__slow'>
            {
                notes.map( note => (
                    <JournalEntry
                        key={ note.id } 
                        { ...note }
                    />
                ))
            }
        </div>
    )
}
