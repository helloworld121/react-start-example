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
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

// the token expires after a certain time.
// => therefore we need to check if the token is still valid, to maybe log the user out
export const checkAuthTmeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
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
                console.log(response);
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
    }
};
