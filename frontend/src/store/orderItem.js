import csrfFetch from "./csrf";

// Action types
const GET_ORDER_ITEMS = "Orders/GET_ORDER_ITEMS";

// Action creators
export const getOrderItems = (orders) => ({
	type: GET_ORDER_ITEMS,
	orders,
});

// Thunk action creators
export const getOrderItemsThunk = (orderID) => async (dispatch) => {
	const res = await csrfFetch(`/api/order_items?userId=${orderID}`);
	if (res.ok) {
		const Orders = await res.json();
		dispatch(getOrderItem(Orders));
	}
};

// Reducer
const orderItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'orderItems/ADD_ITEM':
            return [...state, action.payload];
        case 'orderItems/REMOVE_ITEM':
            const newState = state.filter(item => item.id !== action.payload);
            return newState;
        case 'orderItems/CLEAR_ITEMS':
            return [];
        default:
            return state;
    }
};

export default orderItemsReducer;
