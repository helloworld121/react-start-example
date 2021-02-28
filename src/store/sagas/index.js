import {takeEvery} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';

export function* watchAuth() {
    // this will register a listener, that executes the function when ever the action appears
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);

    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);

    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);

    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}
