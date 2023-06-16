import csrfFetch from "./csrf";

// Action types
const GET_ORDERS = "Orders/GET_ORDERS";
const ADD_ORDER = "Orders/ADD_ORDER";

// Action creators
export const getOrders = (orders) => ({
	type: GET_ORDERS,
	orders,
});

export const addOrder = (order) => ({
	type: ADD_ORDER,
	order,
});

// Thunk action creators
export const getOrdersThunk = (userId) => async (dispatch) => {
	const res = await csrfFetch(`/api/orders?userId=${userId}`);
	if (res.ok) {

		const Orders = await res.json();

		dispatch(getOrders(Orders));
	} else {
	}
};

// Redux action
export const addOrderThunk = (order) => async (dispatch) => {
	const response = await csrfFetch("/api/orders", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(order),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(addOrder(data));
	}
};

// Reducer
export default function OrdersReducer(state = {}, action) {
	switch (action.type) {
		case GET_ORDERS: {
			return action.orders;
		}
		case ADD_ORDER: {
			return {
				...state,
				[action.order.id]: action.order,
			};
		}
		default:
			return state;
	}
}
