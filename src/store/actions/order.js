import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseSandwichSuccess = (id, orderData) => { //sync
    return {
        type: actionTypes.PURCHASE_SANDWICH_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};
 export const purchaseSandwichFail = (error) => { //sync
    return {
        type: actionTypes.PURCHASE_SANDWICH_FAIL,
        error: error
    };
}

export const purchaseSandwichStart = () => {
    return {
        type: actionTypes.PURCHASE_SANDWICH_START
    };
};

export const purchaseSandwich = (orderData, token) => { //async
    return dispatch => {
        dispatch(purchaseSandwichStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                //console.log(response.data);
                dispatch(purchaseSandwichSuccess(response.data.name, orderData));
            })
            .catch(error => {
               dispatch(purchaseSandwichFail(error));
            });
    };
}; 

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START   
    };
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'; // query parameter understood by firebase to order its data by userId
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key], // order objects
                    id: key // order id
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
            dispatch(fetchOrdersFail(err));
        });
    };
};