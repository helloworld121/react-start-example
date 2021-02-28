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
export const checkAuthTimeout = (expirationTime) => {
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
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup,
    }
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    };
};

// this method is used to load authentication information from localStorage
export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE,
    }
};
