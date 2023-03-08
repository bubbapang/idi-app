// Action types
const GET_CART_ITEMS = 'cartItems/GET_CART_ITEMS';
const ADD_CART_ITEM = 'cartItems/ADD_CART_ITEM';
const UPDATE_CART_ITEM = 'cartItems/UPDATE_CART_ITEM';
const DELETE_CART_ITEM = 'cartItems/DELETE_CART_ITEM';
const CLEAR_CART_ITEMS = 'cartItems/CLEAR_CART_ITEMS';

// Action creators, hits after the thunk action creators
export const getCartItems = (cartItems) => ({
    type: GET_CART_ITEMS,
    cartItems
});

export const addCartItem = (cartItem) => ({
    type: ADD_CART_ITEM,
    cartItem
});

export const updateCartItem = (cartItemId, quantity) => {
    if (quantity < 1) { return deleteCartItem(cartItemId) }
    return {
        type: UPDATE_CART_ITEM,
        cartItemId,
        quantity
    }
}

export const deleteCartItem = (cartItemId) => ({
    type: DELETE_CART_ITEM,
    cartItemId
});

export const clearCartItems = () => ({
    type: CLEAR_CART_ITEMS
});

// Async action creator (thunk)
export const getCartItemsThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/cart_items?userId=${userId}`);
    if (res.ok) {
        const cartItems = await res.json();
        dispatch(getCartItems(cartItems));
    }
}

export const addCartItemThunk = (cartItem) => async (dispatch) => {
    const res = await fetch('/api/cart_items', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
    });
    if (res.ok) {
        const cartItem = await res.json();
        dispatch(addCartItem(cartItem));
    }
}

export const updateCartItemThunk = (cartItemId, quantity) => async (dispatch) => {
    const res = await fetch(`/api/cart_items/${cartItemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity })
    });
    if (res.ok) {
        const cartItem = await res.json();
        const { id, quantity } = cartItem;
        dispatch(updateCartItem(id, quantity));
    }
}

export const deleteCartItemThunk = (cartItemId) => async (dispatch) => {
    const res = await fetch(`/api/cart_items/${cartItemId}`, {
        method: 'DELETE'
    });
    if (res.ok) {
        dispatch(deleteCartItem(cartItemId));
    }
}

// Reducer
export default function cartItemsReducer(state = {}, action) {
    switch (action.type) {
        case GET_CART_ITEMS: {
            return action.cartItems
        }
        case ADD_CART_ITEM: {
            const newState = { ...state };
            newState[action.cartItem.id] = action.cartItem;
            return newState;
        }
        case UPDATE_CART_ITEM: {
            const newState = { ...state };
            newState[action.cartItem.id].quantity = action.quantity;
            return newState;
        }
        case DELETE_CART_ITEM: {
            const newState = { ...state };
            delete newState[action.cartItemId];
            return newState;
        }
        case CLEAR_CART_ITEMS: {
            return {};
        }
        default:
            return state;
    }
}