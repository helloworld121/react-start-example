import {put, delay} from 'redux-saga/effects'
import * as actionCreators from '../actions/index';
import config from "../../environment.json";
import axios from "axios";



// clear actionCreator
// sagas are relacted to functions
// the star transfers this function to a generator
//   => generator functions are next javascript functions
//   => that can be paused
//   => for example to wait for async-code to finish
export function* logoutSaga(action) {
    // each step must be prefixed with yield => and than it will wait for it to finish
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    // put will dispatch a new action
    yield put(actionCreators.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    // it is also possible to store the refreshToken and exchange it for a new idToken
    // => this way it is possible to keep the user authenticated
    yield delay(action.expirationTime * 1000);
    yield put(actionCreators.logout());
}

export function* authUserSaga(action) {

    yield put(actionCreators.authStart());

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true,
    };


    let url = config.url4SignUp + config.firebaseApiKey;
    if(!action.isSignup) {
        // authenticating url
        url =config.url4SignIn + config.firebaseApiKey;
    }

    // yield won't return a promise but wait for the promise to return or reject
    // axios will pause until the promise resolves or reject, therefore we can execute the code kind of synchronously
    try {
        const response = yield axios.post(url, authData);

        // we also want to persist the authentication-state of the user
        // this could also be done in authSuccess => but it makes sense to also use the expires-time
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actionCreators.authSuccess(response.data.idToken, response.data.localId));
        yield put(actionCreators.checkAuthTimeout(response.data.expiresIn));
    } catch(error) {
        yield put(actionCreators.authFail(error.response.data.error));
    }

}
