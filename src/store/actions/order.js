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

// this action is just to set the loading-state to true before executing the ajax-call
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

// this is our ASYNC action where we use the thunk middleware
// => thunk provides the dispatch-function
export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        // before ajax call we want to set the loading state
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                // we gonna dispatch to a SYNC-Action
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
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

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = (token, userId) => {
    return (dispatch) => {
        // before ajax call we want to set the loading state
        dispatch(fetchOrdersStart());

        // we only want to receive orders created by the current user
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
            .then( response => {
                // console.log(response.data);
                const fetchedOrders = [];
                for(let key in response.data) {
                    fetchedOrders.push({...response.data[key], id: key});
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(error => {
                dispatch(fetchOrderFail(error));
            });
    };
};
