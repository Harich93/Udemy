import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const note = useSelector(state => state.note.active );
    const [ values, handleInputChange, reset ] = useForm(note);
    const { title, body, url } = values;

    const activeId = useRef( note.id );
    const activeUrl = useRef( note.url );

    const handleDelete = () => {
        dispatch( startDeleting( note.id ) );
    }
    
    useEffect(() => {

        if ( note.id !== activeId.current ) {
            reset( note );
            activeId.current = note.id;
        }
        if ( note.url !== activeUrl.current ) {
            reset( note );
            activeUrl.current = note.url;
        }

    }, [note, reset, note.url ]);

    useEffect(() => {
        
        dispatch( activeNote( values.id, { ...values } ) );

    }, [values, dispatch,] )
    
    return (
        <div className='notes___main-content'>
            <NotesAppBar />

            <div className='notes__content'>

                    <input 
                        type='text'
                        name='title'
                        placeholder='Some awasome title'
                        className='notes__title-input'
                        value={ title }
                        autoComplete='off'
                        onChange={ handleInputChange }
                    />

                    <textarea
                        placeholder='What happened today'
                        name='body'
                        className='notes__textarea'
                        value={ body }
                        onChange={ handleInputChange }
                    ></textarea>

                    {
                        url &&
                            <div className='notes__image'>
                                <img
                                    src={ url }
                                    alt='Imagen nota'
                                />
                            </div>
                    }

             
            </div>
            <button
                className='btn btn-delete'
                onClick={ handleDelete }
            >Delete</button>
        </div>
    )
}
