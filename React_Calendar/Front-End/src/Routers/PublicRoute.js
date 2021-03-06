import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types';


export const PublicRoute = ({
    isAuthenticate,
    component: Component,
    ...rest
}) => {

    return (
        <Route {...rest}
            component={ (props) => (
                isAuthenticate
                    ? <Redirect to='/' />
                    : <Component {...props} />
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthenticate: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}