
import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const stratNewNote = () => {
    return async ( dispatch, getState ) => {

        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await db.collection( `${ uid }/journal/notes` ).add( newNote )
        
        dispatch( activeNote( doc.id, newNote) );
        dispatch( addNewNote( doc.id, newNote ) );
    }

}
 
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const addNewNote =( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = ( uid ) => {
    return async( dispatch ) => {
        const notes = await loadNotes( uid );
        dispatch( setNotes( notes ) );
    }
}

export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes
});

export const savedNote = ( note ) => {

    return async( dispatch, getState ) => {

        const { uid } = getState().auth;
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        // !note.url && delete note.url
        

        const arch = await db.doc( `${ uid }/journal/notes/${ note.id }` )
            .update( noteToFirestore )

        console.log( arch )

        dispatch( refreshNote( note.id, note ) );
        Swal.fire( 'Saved', note.title, 'success');
    } 
}

export const refreshNote = ( id, note ) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        const { active: activeNote } = getState().note;
        Swal.fire({
            title: 'Uploading...',
            text: 'Please await...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },   
        });
        
        const fileUrl = await fileUpload( file );
        activeNote.url = fileUrl;
        
        dispatch( savedNote( activeNote ) );

        Swal.close();
    }
}

export const startDeleting = ( id ) => {
    console.log(id)
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        
        await db.doc( `${ uid }/journal/notes/${ id }` ).delete()
            .then( () => Swal.fire( 'Delete', id, 'success') )
            .catch( console.log )

        dispatch( deleteNote(id) ); 
    }

}

export const deleteNote = ( id ) => ({
    type: types.notesDeleted,
    payload: id
})

export const logoutNote = () => ({
    type: types.notesLogoutCleaning
})