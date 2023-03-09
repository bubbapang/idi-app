// Action types
const GET_STORE_ITEM = 'storeItem/GET_STORE_ITEM';
const GET_STORE_ITEMS = 'storeItem/GET_STORE_ITEMS';

// Action creators
export const getStoreItems = (storeItems) => ({
    type: GET_STORE_ITEMS,
    storeItems
});

export const getStoreItem = (storeItem) => ({
    type: GET_STORE_ITEM,
    storeItem
});

// Async action creator (thunk)
export const getStoreItemsThunk = (storeId) => {
    return async (dispatch) => {
            const res = await fetch(`/api/store_items?storeId=${storeId}`);
            if (res.ok) {
            const storeItems = await res.json();
            // changes the state of storeItems to an object with the storeItem id as the key
            dispatch(getStoreItems(storeItems));
            return storeItems; // return the data
        }
    };
};

export const getStoreItemThunk = (id) => async (dispatch) => {
    const res = await fetch(`/api/store_items/${id}`);
    if (res.ok) {
        const storeItem = await res.json();
        dispatch(getStoreItem(storeItem));
    }
}

// Reducer
export default function storeItemReducer(state = {}, action) {
    switch (action.type) {
        case GET_STORE_ITEMS: {
            return action.storeItems
        }
        case GET_STORE_ITEM: {
            const newState = { ...state };
            newState[action.storeItem.id] = action.storeItem;
            return newState;
        }
        default:
            return state;
    }
}
