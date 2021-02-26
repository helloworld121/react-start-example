import axios from 'axios';

import config from '../../environment.json';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const logout = () => {
    // if the user execute logout we also need to remove authentication information from localStorage
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT,
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
}

// the token expires after a certain time.
// => therefore we need to check if the token is still valid, to maybe log the user out
export const checkAuthTmeout = (expirationTime) => {
    // this will be done by a saga
    // it is also possible to store the refreshToken and exchange it for a new idToken
    // => this way it is possible to keep the user authenticated
    // return (dispatch) => {
    //     setTimeout(() => {
    //         dispatch(logout());
    //     }, expirationTime * 1000);
    // };

    // dispatch action, that leeds to saga
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime,
    }
};

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };

        //
        let url = config.url4SignUp + config.firebaseApiKey;
        if(!isSignup) {
            // authenticating url
            url =config.url4SignIn + config.firebaseApiKey;
        }

        axios.post(url, authData)
            .then((response) => {
                //console.log(response);

                // we also want to persist the authentication-state of the user
                // this could also be done in authSuccess => but it makes sense to also use the expires-time
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);


                dispatch(authSuccess(response.data.idToken, response.data.localId));

                // we also want to execute some async code to log the user out if the token is invalid
                dispatch(checkAuthTmeout(response.data.expiresIn));
            })
            .catch((error) => {
                // console.log(error);
                // we just want the error-data-object
                dispatch(authFail(error.response.data.error));
            });
        //
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    };
};

// this method is used to load authentication information from localStorage
export const authCheckState = () => {
    // we need dispatch, because we need to dispatch multiple actions
    return (dispatch) => {
        const token = localStorage.getItem('token');
        if(!token) {
            // if there is no token, there is no action we need to execute
            dispatch(logout());
        } else {
            // we retrieve a string from localStorage, but with "new Date" we can convert it to a Date
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch( checkAuthTmeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ) );
            }
        }
    };
};
