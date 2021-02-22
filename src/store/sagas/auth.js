import {put} from 'redux-saga/effects'
import * as actionTypes from '../actions/actionTypes';

// clear actionCreator
// sagas are relacted to functions
// the star transfers this function to a generator
//   => generator functions are next javascript functions
//   => that can be paused
//   => for example to wait for async-code to finish
function* logout(action) {
    // each step must be prefixed with yield => and than it will wait for it to finish
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    // put will dispatch a new action
    yield put({
        type: actionTypes.AUTH_LOGOUT,
    });
}
