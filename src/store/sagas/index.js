import {takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {logoutSaga} from './auth';

export function* watchAuth() {
    // this will register a listener, that executes the function when ever the action appears
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}
