import Swal from 'sweetalert2';
import { types } from "../types/types";
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { finishLoading, startLoading } from "./ui";

export const startLoginEmailPass = ( email, pass ) => {
    return ( dispatch ) => {

        dispatch( startLoading() );

        return firebase.auth().signInWithEmailAndPassword( email, pass )
        .then( ({ user }) => {
            dispatch( login( user.uid, user.displayName ) );
            dispatch( finishLoading() );
        })
        .catch( e => {
            console.log( e );
            dispatch( finishLoading() );
            Swal.fire( 'Error', e.message, 'error' );
        })
    }
}

export const startRegisterWhithEmailPassword = ( email, password, name ) => {
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async({ user }) => {

            await user.updateProfile({ displayName: name });

            dispatch( 
                login(user.uid, user.displayName) 
            )
        })
        .catch( console.log )
    }
}

export const startGoogleLogin = () => {
    return ( dispatch ) => {

        firebase.auth().signInWithPopup( googleAuthProvider )
        .then( ({ user }) => {
            dispatch( 
                login(user.uid, user.displayName) 
            )
        } )

    }
}

export const login = ( uid, displayName ) => ({
        
    type: types.login,
    payload: {
        uid,
        displayName
    }

}); 


export const startLogout = () => {
    return async (dispatch) => {
        await firebase.auth().signOut();
        dispatch( logout() );
        dispatch( notesCleaning() );
    }
}

export const logout = () => ({
    type: types.logout
})

const notesCleaning = () => ({
    type: types.notesLogoutCleaning
})


