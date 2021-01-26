import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

// this is our ASYNC action where we use the thunk middleware
// => thunk provides the dispatch-function
export const purchaseBurgerStart = (orderData) => {
    return (dispatch) => {
        axios.post('/orders.json', orderData)
            .then(response => {
                // we gonna dispatch to a SYNC-Action
                dispatch(purchaseBurgerSuccess(response.data, orderData));
                // ATTENTION: props.history isn't available in here
                // => therefore we can't redirect in here
                // after successful passing data => redirect
                // to enable access to the push method we can
                // 1) wrap this component with the "withRouter"-Method
                // 2) we can pass history using props
                // this.props.history.push('/');
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};
