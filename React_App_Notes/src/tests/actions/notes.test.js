
        /*** @jest-environment node */

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import { savedNote, startLoadingNotes, startUploading, stratNewNote } from '../../actions/notes';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';


jest.mock('../../helpers/fileUpload', () => {
    return {
      fileUpload: () => {
        return Promise.resolve(
          "https://this-represents-an-url.com/photo.png"
        );
      },
    };
  });

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const initialState = {
    auth: {
        uid: 'TESTING',
    },
    note: {
        notes: [],
        active: {
            id: '4kSFeyrJDG1DfIgftk0z',
            title: 'Title',
            body: 'Body',
            url: ''
        }
    },
}
 
let store = mockStore( initialState )


describe('Pruebas en actions notes', () => {

    afterAll(()=>{
        db.terminate()
    })

    afterEach( () => {
        store = mockStore( initialState )
    })
    
    test('Debe de crear una nueva nota', async() => {

        await store.dispatch( stratNewNote() )
        const action = store.getActions();
        
        expect( action[0] ).toEqual({
            type: types.notesActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
              }
        });

        expect( action[1] ).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number)
              }
        });

        const docId = action[1].payload.id
        await db.doc(`/TESTING/journal/notes/${docId}`).delete()
    });

    test('startLoadingNotes debe cargar las notas', async() => {

        await store.dispatch( startLoadingNotes('TESTING') );
        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });

        const expected = { 
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        };

        expect( actions[0].payload[0] ).toMatchObject( expected );


    });


    test('saveNote debe de actualizar la nota', async() => {

        const note = {
            id: '4kSFeyrJDG1DfIgftk0z',
            body: 'Nota Actualizada',
            title: 'Title'
        };

        await store.dispatch( savedNote(note) );

        const actions = store.getActions();

        expect( actions[0].type ).toBe( types.notesUpdated );

        const docRef = await db.doc(`/TESTING/journal/notes/${ note.id}`).get();

        expect( docRef.data().title ).toBe( note.title );

    });

    test('startUploading debe actualizar el url del entry', async() => {
        


        const file = []
        await store.dispatch( startUploading(file) );

        const docRef = await db.doc('/TESTING/journal/notes/4kSFeyrJDG1DfIgftk0z').get();

        expect( docRef.data().url ).toBe('https://this-represents-an-url.com/photo.png')

    });
});