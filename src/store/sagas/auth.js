import {put, delay} from 'redux-saga/effects'
import * as actionCreators from '../actions/index';
import {logout} from "../actions/index";



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
    yield delay(action.expirationTime);
    yield put(actionCreators.logout());
}
