// Action types
const GET_STORE_ITEMS = 'storeItem/GET_STORE_ITEMS';

// Action creators
export const getStoreItems = (storeItems) => ({
    type: GET_STORE_ITEMS,
    storeItems
});

// Async action creator (thunk)
export const getStoreItemsThunk = () => async (dispatch) => {
    const response = await fetch('/api/store_items');
    const storeItems = await response.json();
    dispatch(getStoreItems(storeItems)); // you need to implement this action
};

export const getStoreItemsByStoreIdThunk = (storeId) => async (dispatch) => {
    const response = await fetch(`/api/store_items?store_id=${storeId}`);
    const storeItems = await response.json();
    dispatch(getStoreItems(storeItems)); // you need to implement this action
};

// Reducer
export default function storeItemReducer(state = {}, action) {
    switch (action.type) {
        case GET_STORE_ITEMS: {
            return action.storeItems
        }
        default:
            return state;
    }
}
