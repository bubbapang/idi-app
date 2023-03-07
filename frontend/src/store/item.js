const GET_ITEMS = 'items/GET_ITEMS';

export const getItems = (items) => ({
    type: GET_ITEMS,
    items
});

export const getItemsThunk = (storeId) => async (dispatch) => {
    const res = await fetch(`/api/stores/${storeId}/items`);
    if (res.ok) {
        const items = await res.json();
        dispatch(getItems(items));
    }
}

export default function itemsReducer(state = {}, action) {
    switch (action.type) {
        case GET_ITEMS: {
            const items = action.payload?.items || [];
            const newState = { ...state };
            items.forEach((item) => {
            newState[item.id] = item;
            });
            return newState;
        }
        default:
            return state;
    }
}