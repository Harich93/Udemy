import moment from 'moment'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savedNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {
    
    const date = moment().format( 'LL' );

    const note = useSelector(state => state.note.active );
    
    const dispatch = useDispatch();
    
    const handleSave = () => {

        dispatch( savedNote( note ) );
    }

    const handleUpdatePicture = () => {
        document.querySelector('#fileSelector').click();
    }
    
    const handleFileChanged = ( e ) => {
        const file = e.target.files[0];

        file && dispatch( startUploading( file ) );

    }

    return (
        <div className='notes__appbar'>
            <span>{ date }</span>

            <input
                id='fileSelector'
                name='file'
                type='file'
                style={ { display: 'none' } }
                onChange={ handleFileChanged }
            />

            <div>
                <button 
                    className='btn'
                    onClick={ handleUpdatePicture }    
                > 
                    Picture
                </button>

                <button 
                    className='btn'
                    onClick={ handleSave }
                > 
                    Save
                </button>
            </div>
        
        </div>
    )
}
