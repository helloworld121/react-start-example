import {put} from 'redux-saga/effects'

import axios from "../../axios-orders";
import * as actionCreators from '../actions/index';


export function* purchaseBurgerSaga(action) {
    // before ajax call we want to set the loading state
    yield put(actionCreators.purchaseBurgerStart());

    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        yield put(actionCreators.purchaseBurgerSuccess(response.data.name, action.orderData));
        // ATTENTION: props.history isn't available in here
        // => therefore we can't redirect in here
        // after successful passing data => redirect
        // to enable access to the push method we can
        // 1) wrap this component with the "withRouter"-Method
        // 2) we can pass history using props
        // this.props.history.push('/');
    } catch(error) {
        yield put(actionCreators.purchaseBurgerFail(error));
    }
}


export function* fetchOrdersSaga(action) {
    // before ajax call we want to set the loading state
    yield put(actionCreators.fetchOrdersStart());

    // we only want to receive orders created by the current user
    const queryParams = '?auth=' + action.token + '&orderBy="userId"&equalTo="' + action.userId + '"';

    try {
        const response = yield axios.get('/orders.json' + queryParams);
        const fetchedOrders = [];
        for(let key in response.data) {
            fetchedOrders.push({...response.data[key], id: key});
        }
        yield put(actionCreators.fetchOrdersSuccess(fetchedOrders));
    } catch(error) {
        yield put(actionCreators.fetchOrderFail(error));
    }
}
