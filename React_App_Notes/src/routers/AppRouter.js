import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { useDispatch} from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';
  

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState( true );

    const [isLoggedIn, setIsLoggedIn] = useState( false );

    useEffect(() => {
        
        firebase.auth().onAuthStateChanged( async(user) => { 
            
            if( user?.uid ) {
                dispatch( login( user.uid, user.displayName ) );
                setIsLoggedIn( true );
                dispatch( startLoadingNotes( user.uid ) );
            } 
            else {
                setIsLoggedIn( false );
            }

            setChecking( false );
        })

    }, [dispatch, setChecking, setIsLoggedIn]);

    if( checking ) 
        return (<h1>Loaging...</h1>)

    return (
        <Router>
            <div>
                <Switch>
                    
                    <PublicRoute 
                        path='/auth' 
                        isAuthenticate={ isLoggedIn }    
                        component={ AuthRouter } 
                    />
                    
                    <PrivateRoute
                        exact
                        path='/' 
                        isAuthenticate={ isLoggedIn }
                        component={ JournalScreen } 
                    />


                    <Redirect to='/auth/login' />
                </Switch>
            </div>
        </Router>
    )
}
