import csrfFetch from "./csrf";

// Action types
const GET_ORDERS = "Orders/GET_ORDERS";
const ADD_ORDER = "Orders/ADD_ORDER";
const CLEAR_ORDERS = "Orders/CLEAR_ORDERS";

// Action creators
export const getOrders = (orders) => ({
	type: GET_ORDERS,
	orders,
});

export const addOrder = (order) => ({
	type: ADD_ORDER,
	order,
});

export const clearOrders = () => ({
	type: CLEAR_ORDERS,
});

// Thunk action creators
export const getOrdersThunk = (userId) => async (dispatch) => {
	
	console.log("getordersthunk HIT")

	const res = await csrfFetch(`/api/orders?userId=${userId}`);
	if (res.ok) {

		const Orders = await res.json();
		console.log("Orders Orders Orders:", Orders)

		dispatch(getOrders(Orders));
	} else {
		console.log("Error in getOrdersThunk:", res);
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
	} else {
		console.log("Error in addOrderThunk:", response);
	}
};

// Reducer
export default function OrdersReducer(state = {}, action) {
	switch (action.type) {
		case GET_ORDERS: {
			return action.orders;
		}
		case ADD_ORDER: {
			const newState = { ...state };
			newState[action.order.id] = action.order;
			return newState;
		}
		case CLEAR_ORDERS: {
			return {};
		}
		default:
			return state;
	}
}
