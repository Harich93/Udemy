import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { logoutNote, stratNewNote } from '../../actions/notes'
import { JournalEntries } from './JournalEntries'

export const Sidebar = () => {

    const dispatch = useDispatch();

    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch( startLogout() );
        dispatch( logoutNote() );
    }

    const handleAddNew = () => [
        dispatch( stratNewNote() )
    ]

    return (
        <aside className='journal__sidebar'>
            <div className='journal__sidebar-navbar mt-3'>
                <h3>
                    <i className='far fa-user-circle fs-2' />
                    <span className='fs-2'> { name } </span>
                </h3>

                <button
                    className='btn btn-logout'
                    onClick={ handleLogout }
                >Logout <i className="fas fa-sign-out-alt fs-1"></i></button>
            </div>

            <div className='journal__new-entry'>
                <i 
                    className='far fa-calendar-plus fa-5x' 
                    onClick={ handleAddNew } 
                />
                <p className='mt-5'>New entry</p>
            </div>

            <JournalEntries />
        </aside>
    )
}
