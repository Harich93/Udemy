import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
  } from "react-router-dom";
import { startChecking } from '../Actions/auth';
import { LoginScreen } from '../Components/auth/LoginScreen';
import { CalendarScreen } from '../Components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const RouterApp = () => {

    const dispatch = useDispatch();

    const { checking, uid } = useSelector(state => state.authR);

    useEffect(() => {
        console.log('use effect activo')
        dispatch( startChecking() );
    }, [dispatch]);

    if( checking ) {
        return (<h5>Espere...</h5>)
    }

    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        isAuthenticate={ !!uid }
                        path='/login'
                        component={ LoginScreen }
                    />
                    
                    <PrivateRoute
                        isAuthenticate={ !!uid }
                        path='/'
                        component={ CalendarScreen }
                    />


                    <Redirect to='/' />
                </Switch>
            </div>
        </Router>
    )
}
