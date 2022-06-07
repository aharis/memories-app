import React from 'react';
import { useSelector } from 'react-redux';

import {Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const isAuth = useSelector(state => state?.user)
    return (
        <Route {...rest}
        render={() => isAuth  ? 
            <Component {...rest} /> :
    
            <Redirect to='/' />
        } />
    )
}

export default PrivateRoute;