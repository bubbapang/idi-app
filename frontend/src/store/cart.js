// this is the cart store

const ADD_ITEM = 'cart/ADD_ITEM';
const REMOVE_ITEM = 'cart/REMOVE_ITEM';
const CLEAR_CART = 'cart/CLEAR_CART';

const addItem = (item) => ({
    type: ADD_ITEM,
    payload: item,
});

const removeItem = (itemId) => ({
    type: REMOVE_ITEM,
    payload: itemId,
});

const clearCart = () => ({
    type: CLEAR_CART,
});

export const addItemToCart = (item) => async (dispatch) => {
    dispatch(addItem(item));
}

export const removeItemFromCart = (itemId) => async (dispatch) => {
    dispatch(removeItem(itemId));
}

export const clearCartItems = () => async (dispatch) => {
    dispatch(clearCart());
}

const initialState = {};

export default function cartReducer (state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_ITEM:
            newState = { ...state };
            if (newState[action.payload.id]) {
                newState[action.payload.id].count++;
            } else {
                newState[action.payload.id] = { ...action.payload, count: 1 };
            }
            return newState;
        case REMOVE_ITEM:
            newState = { ...state };
            if (newState[action.payload].count > 1) {
                newState[action.payload].count--;
            } else {
                delete newState[action.payload];
            }
            return newState;
        case CLEAR_CART:
            return initialState;
        default:
            return state;
    }
}
