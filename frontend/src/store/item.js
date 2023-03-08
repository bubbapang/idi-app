// Action types
const GET_ITEMS = 'items/GET_ITEMS';

// Action creators
export const getItems = (items) => ({
    type: GET_ITEMS,
    items
});

// Async action creator (thunk)
export const getItemsThunk = () => async (dispatch) => {
    const res = await fetch('/api/items');
    if (res.ok) {
        const items = await res.json();
        dispatch(getItems(items));
    }
}

// Reducer
export default function itemsReducer(state = {}, action) {
    switch (action.type) {
        case GET_ITEMS: {
            return action.items
        }
        default:
            return state;
    }
}
